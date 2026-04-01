import { UserStore } from '../../src/models/user';
import client from '../../src/database';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await store.create({
      firstname: 'tala',
      lastname: 'salim',
      password: '1234'
    });

    expect(result.firstname).toEqual('tala');
    expect(result.lastname).toEqual('salim');
  });

  it('should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a user', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
    expect(result.firstname).toEqual('tala');
    expect(result.lastname).toEqual('salim');
  });

  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM users');
    conn.release();
  });
});