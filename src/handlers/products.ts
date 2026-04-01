import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400).json(error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const user = await store.show(id);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;

    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const updatedProduct = await store.update(id, product);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

 

const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const deletedProduct = await store.delete(id);
    res.json(deletedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};

const productRoutes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;