import type { FastifyInstance } from "fastify";
import { createProduct, deleteProduct, onNotFound, getProduct, getProducts, updateProduct, onError } from "./controller.js";

export async function getRoutes(fastify: FastifyInstance) {
    fastify.get('/api/products', {handler: getProducts});
    fastify.get('/api/products/:id', {handler: getProduct});
    fastify.post('/api/products', {handler: createProduct});
    fastify.put('/api/products/:id', {handler: updateProduct});
    fastify.delete('/api/products/:id', {handler: deleteProduct});
    fastify.setNotFoundHandler(onNotFound);
    fastify.setErrorHandler(onError);
}

