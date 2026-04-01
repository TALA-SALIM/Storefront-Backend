import supertest from 'supertest';
import app from '../src/server';
import client from '../src/database';
import { UserStore } from '../src/models/user';

const request = supertest(app);
const userStore = new UserStore();

describe('Endpoint Tests', () => {
  let token = '';

  beforeAll(async () => {
    const response = await request.post('/users').send({
      firstname: 'noor',
      lastname: 'moh',
      password: '1234'
    });

    token = response.body;
  });

  it('GET / should return 200', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('GET /products should return 200', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('POST /products should return 200', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'sunflower',
        price: 50,
        category: 'flowers'
      });

    expect(response.status).toBe(200);
  });

  it('GET /users should return 200', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');
    conn.release();
  });
});