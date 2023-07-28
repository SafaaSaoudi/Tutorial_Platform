const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UtilisateurController");
const multer = require("../middlewares/multer");
router
    .post( "/addUser", multer, userController.AjouterUtilisateur )
    .get("/mails",userController.findUsersEmails)
    
module.exports = router;