module.exports = {
    getConfig: (req, res, next) => {
        res.status(200).send({
            clientID: process.env.AUTH_CLIENT_ID,
            callbackUrl: process.env.AUTH_CALLBACK_URL,
            domain: process.env.AUTH_DOMAIN
        })
    }
}