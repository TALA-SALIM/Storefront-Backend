import client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstname, lastname FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstname, lastname FROM users WHERE id=$1';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get user ${id}: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING id, firstname, lastname';

      const hash = bcrypt.hashSync(
        `${user.password}${pepper}`,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create user: ${error}`);
    }
  }

  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE firstname=$1';
      const result = await conn.query(sql, [firstname]);

      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(`${password}${pepper}`, user.password_digest)) {
          conn.release();
          return {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname
          };
        }
      }

      conn.release();
      return null;
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }
}