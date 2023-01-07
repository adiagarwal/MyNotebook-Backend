let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

class Util_Library{
    async generateHash(password){
       let salt = await bcrypt.genSalt(10); 
       return await bcrypt.hash(password, salt);
    }
    async createAccessToken(arg){
        return jwt.sign(arg, process.env.JWT_SECRET);
    }
    async verifyAccessToken(jwt){
        return jwt.verify(jwt,process.env.JWT_SECRET)
    }
    async comparePassword(password,hash){
        return await bcrypt.compare(password, hash);
    }
}

module.exports = Util_Library