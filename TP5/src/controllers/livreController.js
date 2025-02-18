import {Livre} from "../database/model.js";

export const ajouterLivre = async (request, reply) => {
    try {
        const book = new Livre(request.body);
        await book.save();
        reply.send({
            title: book.title,
            author: book.author,
            description: book.description,
            format: book.format,
        });
    } catch (err) {
        reply.status(500).send(err);
    }
};