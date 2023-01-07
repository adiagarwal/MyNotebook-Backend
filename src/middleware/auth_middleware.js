let jwt = require('jsonwebtoken');


const verifyToken = (req , res , next) =>{
    const method = "[verifyToken_Middleware]"
    let token = req.header('auth-token');
    if(!token){
        return res.status(400).send({msg : "Please authenticate using a valid token!"})
    }
    try{
        let data = jwt.verify(token,process.env.JWT_SECRET)
        req.user = data
        next();
    }catch(err){
        console.log(`Error : ${method}`,err)
        return res.status(400).send({msg : "Please authenticate using a valid token!"})
    }
}

module.exports = verifyToken