import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import * as fs from "node:fs";

export default fp(async function (app, opts) {
    const privateKey = fs.readFileSync('./.ssl/private_key_jwt.pem', 'utf8')
    const publicKey = fs.readFileSync('./.ssl/public_key.pem', 'utf8')

    app.register(fastifyJwt, {
        secret: {
            private: privateKey,
            public: publicKey
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
    })
})