import type { FastifyReply, FastifyRequest } from "fastify";
import type { Product } from "./product.js";
import { ProductModel } from "./productModel.js";

export const productModel = new ProductModel();
const product1: Product = {
    id: '1',
    name: 'mewmew',
    description: 'who am i',
    price: 5,
    category: 'books',
    inStock: true
}

const product2: Product = {
    id: '2',
    name: 'woofwoof',
    description: 'who am i',
    price: 5,
    category: 'clothing',
    inStock: false
}

productModel.productBase.push(product1);
productModel.productBase.push(product2);

export async function getProducts(
    request: FastifyRequest<{Body: Product}>, 
    reply: FastifyReply
) {
    return productModel.getProducts();
}

export async function createProduct(
    request: FastifyRequest<{Body: Product}>, 
    reply: FastifyReply
) {
    const body = request.body;
    productModel.addProduct(body);
    console.log({body})
    return reply.code(201).send('User created');
}