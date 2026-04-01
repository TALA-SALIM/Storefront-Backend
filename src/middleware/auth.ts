import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET as string;

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      res.status(401).json('Access denied, missing token');
      return;
    }

    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, tokenSecret);
    next();
  } catch (error) {
    res.status(401).json('Access denied, invalid token');
  }
};

export default verifyAuthToken;