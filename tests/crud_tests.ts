import { test } from 'node:test';
import { FastifyInstance } from "fastify";
import assert from 'node:assert';
import { buildServer } from '../src/buildServer.js';


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