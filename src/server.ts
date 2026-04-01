import express, { Application, Request, Response } from 'express';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.get('/', (_req: Request, res: Response): void => {
  res.send('Storefront backend is running');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(port, (): void => {
  console.log(`Server is running on port ${port}`);
});

export default app;