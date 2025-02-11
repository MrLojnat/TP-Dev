import fp from 'fastify-plugin'

export default fp(async function (app, opts) {

    app.decorate('authenticate', async (request, reply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

})