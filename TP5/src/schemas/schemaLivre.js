export const schemaLivreEntree = {
    type: 'object',
    required: ['title', 'author'],
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        description: { type: 'string' },
        format: { type: 'string', enum: ['poche', 'manga', 'audio'] },
    },
};

export const schemaLivreSortie = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        description: { type: 'string' },
        format: { type: 'string', enum: ['poche', 'manga', 'audio'] },
    },
};