const mongodb = require('mongoose')
mongodb.set('strictQuery', false);
const connect_string = "mongodb://localhost:27017/Mynotebook"

const connectToMongodb = async () =>{
    mongodb.connect(connect_string,()=>{
        console.log("Successfully connected to Mongodb!")
    })
}

module.exports = {connectToMongodb , mongodb}