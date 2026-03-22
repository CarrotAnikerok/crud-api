import { test } from 'node:test';
import { FastifyInstance } from "fastify";
import { app } from "../src/server.js"
import assert from 'node:assert';
import { Product } from '../src/product.js';

test('GET api/products', async(t) => {
    const fastify:FastifyInstance = app;

    const response = await fastify.inject({
        method: 'GET',
        url: 'api/products'
    })

    assert.strictEqual(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.payload), []);

    await fastify.close();
})