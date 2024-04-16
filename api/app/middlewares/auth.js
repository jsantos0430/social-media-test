exports.verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (token == process.env.TOKEN_API) next();
        else throw 'Invalid Token'
    } catch (err) {
        console.log(err)
        res.status(401).json({ err })
    }
}