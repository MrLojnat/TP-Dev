import { Kafka } from "kafkajs";
import { createClient } from 'redis';
import { getTopic, getLocalBroker } from "./config/config.js";

const isLocalBroker = getLocalBroker()
const redpanda = new Kafka({
    brokers: [
        isLocalBroker ? `${process.env.HOST_IP}:9092` : 'redpanda-0:9092',
        'localhost:19092'],
});

export const redisOptions = {
    password: "redispwd"
}

const topic = getTopic()
const consumer = redpanda.consumer({ groupId : 'test' });
const redisClient = createClient(redisOptions);


const connecterRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connecté !");
    } catch (error) {
        console.error("Erreur :", error);
    }
};

const processMessage = async (message) => {
    const text = message.value.toString();
    const words = text.split(/\s+/).map(word => word.toLowerCase().replace(/\W/g, "")); // Nettoyage

    console.log(`[${formatTimestamp(Number(message.timestamp))}] ${text}`);

    for (const word of words) {
        if (word) {
            await redisClient.INCR(word);
        }
    }
};


const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fr-FR") + " à " + date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

const connecter = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic });
        console.log(`Abonné au topic "${topic}"`);
    } catch (error) {
        console.error("Erreur lors de la connexion/abonnement :", error);
    }
};

const consommer = async () => {
    try {
        console.log(`En attente des messages du topic "${topic}"...`);

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                await processMessage(message);
            },
        });
    } catch (error) {
        console.error("Erreur lors de la consommation des messages :", error);
    }
};

(async () => {
    await connecterRedis();
    await connecter();
    await consommer();
})();
