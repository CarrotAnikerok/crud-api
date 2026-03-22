import { test } from 'node:test';
import { FastifyInstance } from "fastify";
import assert from 'node:assert';
import { buildServer } from '../src/buildServer.js';
import z from 'zod';


test('GET api/products get an empty array scenario', async(t) => {
    const fastify:FastifyInstance = await buildServer();

    const response = await fastify.inject({
        method: 'GET',
        url: 'api/products'
    })

    assert.strictEqual(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.payload), []);

    await fastify.close();
})

test('POST api/products post new product scenario', async(t) => {
    const fastify:FastifyInstance = await buildServer();

    const testProduct = {
        "name": "Home of leaves",
        "description": "what a book huh",
        "price": 200,
        "category": "books",
        "inStock": true,
    }

    const response = await fastify.inject({
        method: 'POST',
        url: 'api/products',
        payload: testProduct
    })

    const parsedResponse = JSON.parse(response.payload);

    assert.strictEqual(response.statusCode, 201);
    assert.partialDeepStrictEqual(parsedResponse, testProduct);
    assert.strictEqual(parsedResponse.hasOwnProperty('id'), true);

    await fastify.close();
})


test('GET api/products/{productId} post and get created record', async(t) => {
    const fastify:FastifyInstance = await buildServer();

    const testProduct = {
        "name": "Dream of the red chamber",
        "description": "Truth becomes fiction when the fiction’s true; Real becomes not-real when the unreal’s real",
        "price": 1000,
        "category": "books",
        "inStock": false,
    }

    const postResponse = await fastify.inject({
        method: 'POST',
        url: 'api/products',
        payload: testProduct
    })

    const response = await fastify.inject({
        method: 'GET',
        url: `api/products/${JSON.parse(postResponse.payload).id}`
    })

    const parsedResponse = JSON.parse(response.payload);
    const resultId = z.uuid().safeParse(parsedResponse.id);

    assert.strictEqual(response.statusCode, 200);
    assert.partialDeepStrictEqual(parsedResponse, testProduct);
    assert.strictEqual(resultId.success, true);

    await fastify.close();
})