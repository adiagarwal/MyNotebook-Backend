let express = require("express");
let verifyToken = require("../middleware/auth_middleware");
let authRoutes = express.Router();
let {authController} = require('../controllers/index');


authRoutes.delete("/purge/user", authController.removeUser);
authRoutes.put("/update/user",authController.updateUser );
authRoutes.post("/signup", authController.Signup);
authRoutes.post("/signin", authController.Signin);
authRoutes.get("/getuser", verifyToken, authController.getUser)




module.exports = authRoutes;
