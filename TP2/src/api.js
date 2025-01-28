import {createHash} from 'node:crypto'
/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    const publicKey = "bc8ee7fbb95a0c8756c6d977d7133d60"
    const privateKey = "b328c07530ffc46cfccffd36d5290314f2745c46"
    const ts = Date.now().toString()
    const hash = await getHash(publicKey, privateKey, ts)

    return fetch(url + "?apikey=" + publicKey + "&ts=" + ts + "&hash=" + hash).then(data => data.json())
}

/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<string>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    return createHash('md5').update(timestamp + privateKey + publicKey).digest('hex').toString()
}