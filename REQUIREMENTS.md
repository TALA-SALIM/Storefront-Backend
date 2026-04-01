# Storefront Backend Requirements

## API Endpoints

### Users

- GET /users  
  Get all users (Token required)

- GET /users/:id  
  Get user by id (Token required)

- POST /users  
  Create new user

- POST /authenticate  
  Authenticate user and return token

---

### Products

- GET /products  
  Get all products

- GET /products/:id  
  Get product by id

- POST /products  
  Create product (Token required)

- PUT /products/:id  
  Update product (Token required)

- DELETE /products/:id  
  Delete product (Token required)

---

### Orders

- POST /orders  
  Create order (Token required)

- GET /orders/current/:user_id  
  Get current order by user (Token required)

- GET /orders/completed/:user_id  
  Get completed orders (Token required)

- POST /order-products  
  Add product to order (Token required)

---

## Data Shapes

### User
```ts
{
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
}