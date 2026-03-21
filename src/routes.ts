import type { FastifyInstance } from "fastify";
import { createProduct, getProducts } from "./crudController.js";

export async function getRoutes(fastify: FastifyInstance) {
    const func = () => {console.log('hi')};
    fastify.get('/api/products', {handler: getProducts});
    fastify.get('/api/products/:id', {handler: createProduct});
    fastify.post('/api/products', {handler: createProduct});
    fastify.put('/api/products/:id', {handler: func});
    fastify.delete('/api/products/:id', {handler: func});
}

