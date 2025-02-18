import {connect} from 'mongoose'

export const connexion = async () => {
    try {
        await connect('mongodb://localhost:27017/librairie');
        console.log('Connexion à MongoDB réussie');
    } catch (err) {
        console.error(err.message);
    }
};
