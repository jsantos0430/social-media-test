exports.verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token == process.env.TOKEN_API) next();
        else throw 'Invalid Token'
    } catch (err) {
        // Add specialized error handling, like using newrelic or sentry
        console.log(err)
        res.status(401).json({ err })
    }
}