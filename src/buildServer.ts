import Fastify, { FastifyInstance } from "fastify";
import { getRoutes } from "./crud/routes.js";
import 'dotenv/config';

export async function buildServer() {
    const PORT: number = parseInt(process.env.port || '3000');

    const fastify: FastifyInstance = Fastify({
        logger: true,
    })

    //use prefix?
    fastify.register(getRoutes);

    try {
        await fastify.listen({
        port: PORT
        });
        fastify.log.info(`server running on port ${PORT}`);
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

    return fastify;
}