let Auth_Controller = require('./auth_controller');
let Notes_Controller = require('./notes_controller')

let authController = new Auth_Controller();
let notesController = new Notes_Controller();


module.exports = {authController , notesController}
