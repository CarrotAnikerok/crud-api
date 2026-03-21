import Fastify from "fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import { getRoutes } from "./routes.js";
import type { Product } from "./product.js";

const fastify = Fastify({
    logger: true,
})

fastify.register(getRoutes)
//use prefix?

fastify.get('/', {
    handler: async() => {
        return {message: "mew mew mew!"};
    }
})

fastify.post('/api/users', {
    handler: async(request: FastifyRequest<{Body: Product}>, reply: FastifyReply) => {
        const body = request.body;
        console.log({body});
        console.log(typeof {body});
        return reply.code(201).send('User created');
    }
});

// Run the server!

try {
    await fastify.listen({
      port: 3000
    })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async() => {
      await fastify.close();
      process.exit(0);
    })
})