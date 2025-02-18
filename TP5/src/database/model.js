import {Schema, model} from 'mongoose';

export const schemaLivre = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: String,
    format: {
        type: String,
        enum: ['poche', 'manga', 'audio'],
        default: 'poche',
    },
})

export const Livre = model('Livre', schemaLivre)