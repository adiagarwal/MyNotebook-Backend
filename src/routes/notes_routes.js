let express = require("express");
let verifyToken = require("../middleware/auth_middleware");
let {notesController} = require('../controllers/index');
let notesRoutes = express.Router();



notesRoutes.get("/fetchNotes", verifyToken, notesController.fetchAllUserNotes);
notesRoutes.post("/new", verifyToken, notesController.createNewNote);
notesRoutes.put("/edit/:id", verifyToken, notesController.updaterUserNote);
notesRoutes.delete("/remove/:id", verifyToken, notesController.deleteUserNote);





module.exports = notesRoutes;
