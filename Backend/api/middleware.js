const jwt = require("jsonwebtoken");
module.exports = async function(req,res,next){
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send("Token Not found");
        }
        let decoded = jwt.verify(token,'jwtPassword');
        req.user = decoded.user;
        // console.log(req.user)
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).send("Authentication Error")
    }
}