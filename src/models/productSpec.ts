import { ProductStore } from '../../src/models/product';
import client from '../../src/database';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await store.create({
      name: 'rose',
      price: 25,
      category: 'flowers'
    });

    expect(result.name).toEqual('rose');
    expect(Number(result.price)).toEqual(25);
  });

  it('should return a list of products', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should show a product', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
    expect(result.name).toEqual('rose');
  });

  it('should update a product', async () => {
    const result = await store.update('1', {
      name: 'tulip',
      price: 30,
      category: 'flowers'
    });

    expect(result.name).toEqual('tulip');
    expect(Number(result.price)).toEqual(30);
  });

  it('should delete a product', async () => {
    const result = await store.delete('1');
    expect(result.name).toEqual('tulip');
  });

  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM products');
    conn.release();
  });
});