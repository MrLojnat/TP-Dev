import {readFile, writeFile} from 'node:fs/promises'
import {getDate, monSecret} from "./divers.js";
import {NotFoundError} from "./errors.js";
import {createHash} from 'node:crypto'
import {v4 as uuidv4} from "uuid"


/* Chemin de stockage des blocks */
const path = './data/blockchain.json'

/**
 * Mes définitions
 * @typedef {id: string, nom: string, don: number, date: string, hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    return readFile(path, 'utf8').then(JSON.parse)
}

/**
 * Trouve un block à partir de son id
 * @return {Promise<Block[]>}
 * @param id
 */
export async function findBlock(id) {
    const data = await findBlocks()
    return data.filter(block => block.id === id)
}

/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const data = await findBlocks()
    return data[data.length - 1] || null
}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const hash = createHash('sha256')

    let block = {
        "id" : uuidv4(),
        "nom" : contenu.nom,
        "don" : contenu.don,
        "date" : getDate(),
        "hash" : await findLastBlock().then(block => block ? hash.update(JSON.stringify(block)).digest('hex') : '')
    }

    const data = await findBlocks()
    const blocks = [...data, block]

    return writeFile(path, JSON.stringify(blocks, null, 2)).then(() => block)
}