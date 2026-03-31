import type { FastifyReply, FastifyRequest } from "fastify";
import { ProductSchema, type Product } from "../view/product.js";
import { ProductModel } from "../view/productModel.js";
import z from "zod"; 

export const productModel = new ProductModel();

export async function onNotFound(
    request: FastifyRequest, 
    reply: FastifyReply
) {
    return reply.code(404).send("Sorry, this address does not exist.");
}

export async function onError(
    error: any,
    request: FastifyRequest, 
    reply: FastifyReply
) {
    return reply.code(500).send("Sorry, internal server error.");
}

export async function getProducts(
    request: FastifyRequest<{Body: Product}>, 
    reply: FastifyReply
) {
    return reply.code(200).send(productModel.getProducts());
}

export async function getProduct(
    request: FastifyRequest<{ Params: { id:string } }>, 
    reply: FastifyReply
) {
    const { id } = request.params;
    const resultId = z.uuid().optional().safeParse(id);
    if (!resultId.success) {
        console.log(resultId.error);
        return reply.code(400).send('Id is invalid: not a uuid');
    }

    const product = productModel.getProductById(id);

    if (!product) {
        return reply.code(404).send(`Product with id: ${id} doesn't exist`);
    }

    return reply.code(200).send(product);
}

export async function createProduct(
    request: FastifyRequest<{Body: Product}>, 
    reply: FastifyReply
) {
    const body = request.body;
    const resultBody = ProductSchema.safeParse(body);
    if (!resultBody.success) {
        console.log(resultBody.error);
        return reply.code(400).send(
            'Body does not contain required fields or if price is not a positive number'
        );
    }

    return reply.code(201).send(productModel.addProduct(body));
}

export async function updateProduct(
    request: FastifyRequest<{ Params: { id:string }, Body: Product}>, 
    reply: FastifyReply
) {
    const { id } = request.params;
    const resultId = z.uuid().optional().safeParse(id);
    if (!resultId.success) {
        return reply.code(400).send('Id is invalid: not a uuid');
    }

    const resultBody = ProductSchema.safeParse(request.body);
    if (!resultBody.success) {
        return reply.code(400).send(
            'Body does not contain required fields or if price is not a positive number'
        );
    }

    const updated = productModel.updateProduct(id, request.body);

    if (!updated) {
        return reply.code(404).send(`Product with id: ${id} doesn't exist`);
    }

    return reply.code(200).send('Product is updated');
}

export async function deleteProduct(
    request: FastifyRequest<{ Params: { id:string } }>, 
    reply: FastifyReply
) {
    const { id } = request.params;
    const resultId = z.uuid().optional().safeParse(id);
    if (!resultId.success) {
        return reply.code(400).send('Id is invalid: not a uuid');
    }

    const isDeleted = productModel.deleteProduct(id);

    if (!isDeleted) {
        return reply.code(404).send(`Product with id: ${id} doesn't exist`);
    }

    return reply.code(204).send(`Product id deleted`);
}

