import express, { Request, Response } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/auth';

const store = new OrderStore();

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

const currentOrderByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.user_id as string;
    const order = await store.currentOrderByUser(userId);
    res.json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

const completedOrdersByUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.user_id as string;
    const orders = await store.completedOrdersByUser(userId);
    res.json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderProduct: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const addedProduct = await store.addProduct(orderProduct);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.post('/orders', verifyAuthToken, create);
  app.get('/orders/current/:user_id', verifyAuthToken, currentOrderByUser);
  app.get('/orders/completed/:user_id', verifyAuthToken, completedOrdersByUser);
  app.post('/order-products', verifyAuthToken, addProduct);
};

export default orderRoutes;