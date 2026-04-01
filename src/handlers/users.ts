import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/auth';

dotenv.config();

const store = new UserStore();
const tokenSecret = process.env.TOKEN_SECRET as string;

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
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
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.authenticate(
      req.body.firstname,
      req.body.password
    );

    if (!user) {
      res.status(401).json('Invalid login information');
      return;
    }

    const token = jwt.sign({ user }, tokenSecret);
    res.json(token);
  } catch (error) {
    res.status(401).json(error);
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.post('/authenticate', authenticate);
};

export default userRoutes;