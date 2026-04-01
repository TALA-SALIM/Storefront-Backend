import client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderStore {
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot create order: ${error}`);
    }
  }

  async currentOrderByUser(user_id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id=$1 AND status='active' LIMIT 1";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get current order for user ${user_id}: ${error}`);
    }
  }

  async completedOrdersByUser(user_id: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=$1 AND status='complete'";
      const result = await conn.query(sql, [user_id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Cannot get completed orders for user ${user_id}: ${error}`
      );
    }
  }

  async addProduct(orderProduct: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();

      const orderCheckSql = 'SELECT status FROM orders WHERE id=$1';
      const orderResult = await conn.query(orderCheckSql, [
        orderProduct.order_id
      ]);

      if (!orderResult.rows.length) {
        conn.release();
        throw new Error('Order not found');
      }

      if (orderResult.rows[0].status !== 'active') {
        conn.release();
        throw new Error('Cannot add product to a completed order');
      }

      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        orderProduct.order_id,
        orderProduct.product_id,
        orderProduct.quantity
      ]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot add product to order: ${error}`);
    }
  }
}