export const getAuthHandler = function (req, rep) {
    const { role } = req.user
    let message

    if (role === 'admin') {
        message = 'Full access'
    } else if (role === 'utilisateur') {
        message = 'Accès limité'
    } else {
        message = 'Rôle inconnu'
    }

    return rep.status(200).send({
        message: message
    })
}

export const getHomeHandler = (req, res) => {
    return res.send({'hello': 'world'})
}