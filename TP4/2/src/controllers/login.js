import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body

    let user = await findUser(users, password)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")
    users.push({"email": email, "password": hashedPassword, "role": role[Math.floor(Math.random() * role.length)]})

    res.status(200).send({
        message: "Utilisateur enregistré !"
    })
}

export const loginUser = async function (req, res) {
    const { email, password } = req.body
    const user = await findUser(email, password)

    if (!user) {
        return res.code(401).send({
            message: 'Utilisateur non-identifié'
        })
    }

    try {
        const token = req.jwt.sign({email: user.email, role: user.role})
        return res.code(200).send({ token })
    } catch (error) {
        req.log.error(error)
        return res.code(500).send({
            message: 'Erreur lors de la signature du jeton'
        })
    }
}

async function findUser(email, password) {
    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")
    return users.find((u) => u.email === email && u.password === hashedPassword)
}

