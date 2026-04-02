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
---
### Products

{
  id?: number;
  name: string;
  price: number;
  category: string;
}



---

### Orders


{
  id?: number;
  user_id: number;
  status: string;
}

---
OrderProduct
{
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
}
----

## Database Schema

### users
- id: SERIAL PRIMARY KEY
- username: VARCHAR(100) UNIQUE
- firstname: VARCHAR(100)
- lastname: VARCHAR(100)
- password_digest: VARCHAR(255)

---

### products
- id: SERIAL PRIMARY KEY
- name: VARCHAR(100)
- price: FLOAT
- category: VARCHAR(100)

---

### orders
- id: SERIAL PRIMARY KEY
- user_id: INTEGER REFERENCES users(id)
- status: VARCHAR(50)

---

### order_products
- id: SERIAL PRIMARY KEY
- order_id: INTEGER REFERENCES orders(id)
- product_id: INTEGER REFERENCES products(id)
- quantity: INTEGER

---

### Relationships
- Each order belongs to one user through `user_id`.
- Each order can contain many products through the `order_products` table.
- The `order_products` table links orders and products using `order_id` and `product_id`.

---

Notes
Passwords are not stored directly in the database.
Instead, a hashed value is stored in the password_digest column.
Authorized routes require a valid JWT token.
The status column in the orders table is used to identify whether an order is active or completed.