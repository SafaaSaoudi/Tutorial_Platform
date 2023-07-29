const express = require("express");
const router = express.Router();
const userController = require("../controllers/UtilisateurController");
const multer = require("../middleware/multer");
router
    .post( "/addUser", multer, userController.AjouterUtilisateur )
    .get("/mails",userController.findUsersEmails)
    
module.exports = router;