import Fastify from "fastify";
import {readFileSync} from "node:fs";
import {connexion} from "./database/database.js";
import routes from "./routes/routes.js";

const fastify = Fastify({
    https: {
        key: readFileSync('./src/.ssl/key.pem'),
        cert: readFileSync('./src/.ssl/cert.pem')
    }
});

// Connexion à MongoDB
await connexion()

// Ajout des routes à fastify
fastify.register(routes)

const start = async () => {
    try {
        await fastify.listen({port: 3000})
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()