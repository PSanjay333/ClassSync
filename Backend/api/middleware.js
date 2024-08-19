const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async function(req, res, next) {
    try {
        let token = req.header('x-token');
        if (!token) {
            return res.status(400).send("Token Not found");
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(400).send("Authentication Error");
    }
}
