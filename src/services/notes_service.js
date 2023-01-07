let note = require("../models/Note");

class Notes_Service{
    async findOne(query){
        return await note.findOne(query);
    }
    async find(query){
      return await note.find(query);
  }
    async create(query){
        return await note.create(query);
    }
    async findById(query){
       return await note.findById(query);
    }
    async updateOne(query){
       return await note.updateOne(query);
    }
    async deleteOne(query){
       return await note.deleteOne(query);
    }
    async findByIdAndUpdate(condition,query,option){
      return await note.findByIdAndUpdate(condition,query,option);
    }
    async findByIdAndDelete(query){
       return await note.findByIdAndDelete(query);
    }
}

module.exports = Notes_Service