let { mongodb } = require('../../db')

let userSchema = new mongodb.Schema({
    name : {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});
const users =  mongodb.model('users',userSchema)
module.exports = users