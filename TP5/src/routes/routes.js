import {ajouterLivre} from '../controllers/livreController.js'
import {schemaLivreEntree, schemaLivreSortie} from "../schemas/schemaLivre.js";

export default async (fastify, options) => {
    fastify.route({
        method: 'POST',
        url: '/books',
        schema: {
            body: schemaLivreEntree,
            response: {
                200: schemaLivreSortie,
            },
        },
        handler: ajouterLivre
    });
}
