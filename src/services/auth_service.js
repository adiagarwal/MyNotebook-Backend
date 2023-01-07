const users = require("../models/User");

class Auth_Service{
    async findOne(query){
        return await users.findOne(query);
    }
    async create(query){
        return await users.create(query);
    }
    async findById(query){
       return  await users.findById(query);
    }
    async updateOne(condition,update){
       return  await users.updateOne(condition,update);
    }
    async deleteOne(query){
       return  await users.deleteOne(query);
    }
}

module.exports = Auth_Service