import { OrderStore } from '../../src/models/order';
import { UserStore } from '../../src/models/user';
import { ProductStore } from '../../src/models/product';
import client from '../../src/database';

const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order Model', () => {
  it('should have a create method', () => {
    expect(orderStore.create).toBeDefined();
  });

  it('should have a currentOrderByUser method', () => {
    expect(orderStore.currentOrderByUser).toBeDefined();
  });

  it('should have a completedOrdersByUser method', () => {
    expect(orderStore.completedOrdersByUser).toBeDefined();
  });

  it('should have an addProduct method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });

  it('should create an order', async () => {
    const user = await userStore.create({
      firstname: 'sara',
      lastname: 'ali',
      password: '1234'
    });

    const result = await orderStore.create({
      user_id: user.id as number,
      status: 'active'
    });

    expect(result.user_id).toEqual(user.id as number);
    expect(result.status).toEqual('active');
  });

  it('should get current order by user', async () => {
    const result = await orderStore.currentOrderByUser('2');
    expect(result.status).toEqual('active');
  });

  it('should add product to order', async () => {
    const product = await productStore.create({
      name: 'lily',
      price: 40,
      category: 'flowers'
    });

    const result = await orderStore.addProduct({
      order_id: 1,
      product_id: product.id as number,
      quantity: 2
    });

    expect(result.quantity).toEqual(2);
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