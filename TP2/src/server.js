import {getData} from "./api.js";

import Fastify from 'fastify';
import fastifyView from '@fastify/view'
import handlebars from 'handlebars'

const results = (await getData("https://gateway.marvel.com/v1/public/characters"))['data']['results']
const personnages = results
    .filter(result => !result.thumbnail.path.includes("image_not_available"))
    .map(character => ({
        name: character.name,
        description: character.description,
        imageUrl: character.thumbnail.path + '/portrait_xlarge.' + character.thumbnail.extension,
    }));

const app = Fastify({logger : true})

app.register(fastifyView, {
    engine: {
        handlebars
    },
    root: '../templates',
    options: {
        partials: {
            header: '/partials/header.hbs',
            footer: '/partials/footer.hbs',
        }
    }
})

// Exemple de route
app.get('/', async (request, reply) => {
    return reply.view('index.hbs', { personnages });
});

// Démarrer le serveur
app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server listening at ${address}`);
});