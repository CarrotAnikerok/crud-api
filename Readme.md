# Welcome to the CRUD API

## Technical requirements

- use 24.x.x version (24.10.0 or upper) of Node.js

## Start

1. Install npm dependencies:

`npm install`

2. Run in prod mode: 

`npm run start:prod`

3. Try to post some product POST api/products with body like :

```
{
  "name": "Home of leaves",
  "description": "what a book huh",
  "price":200,
  "category": "books",
  "inStock": true
}
```

4. Get all products by GET api/products

### Env file

You can configure your .dotenv file with port on which you wan server to run. The example is places in .env.example. Otherwise application will try to run on default 3000 port.

## Running application modes

- npm run start:dev: run application in development mode. your code will be updated in runtime when you change it
- npm run start:prod: build and run application in js.

## Implemented endpoints

- GET api/products - get all products
- GET api/products/{productId} - get existing product by id
- POST api/products - add new product
- PUT api/products/{productId} - update existing product
- DELETE api/products/{productId} - delete existing product