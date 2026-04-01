# Storefront Backend Project

## Project Description
This project is a Storefront Backend API built with Node.js, Express, TypeScript, and PostgreSQL.

It provides APIs for users, products, and orders.

## Ports
- Server port: 3000
- Database port: 5432

## Environment Variables
Create a `.env` file and add the following:

```env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
ENV=dev
BCRYPT_PASSWORD=your_pepper
SALT_ROUNDS=10
TOKEN_SECRET=your_token_secret