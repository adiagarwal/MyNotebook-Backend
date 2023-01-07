let Auth_Service = require('./auth_service')
let Notes_Service = require('./notes_service')


let authService = new Auth_Service();
let noteService = new Notes_Service();

module.exports = {authService , noteService}