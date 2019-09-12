const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('access_token');

    if(!token){
        return res.status(401).send({status:'error', message:'Access denied'});
    }

    try {
        const verified = jwt.verify(token, process.env.APP_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(400).send({status:'error', message:'Invalid Token'});
    }
}