var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Tutorial = require('../models/tutorial');
var userTuto = require('../models/userTuto');
const { Login, Logout} = require("../controllers/controllerUser")
const { validation, loginvalidation } = require("../middleware/validator")
const cors = require('cors');
const resetPasswordController = require('../controllers/resetPassword');

/* GET user DB. */
router.use(cors());
/* GET user DB. */
router.get('/getU', function(req, res, next) {
    User.find()
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error(error);
        // Handle the error
        res.status(500).send('Internal Server Error');
      });
  });

/* POST 2*/
router.post('/addU', function(req,res,next) {
    new User(
        {name:req.body.name, 
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        image:req.body.image,
        role:req.body.role}
        ).save();
    res.send("Added");
});
/* Delete user*/
router.post('/deleteU/:id', function(req,res,next){
    User.findByIdAndRemove(req.params.id, 
        function (err, docs) {
        if (err)
            console.log(err);
        res.send("user deleted");
    })
})

/*update user*/
router.put('/updateU/:id', function(req, res, next) {
    const updateData = {
      name:req.body.name, 
        password:req.body.password,
        email:req.body.email,
        avatar:req.body.avatar,
        roles:req.body.role,
    };
  
    User.findByIdAndUpdate(req.params.id, updateData, { new: true }, (err, updatedUser) => {
      if (err) {
        console.error(err);
        // Handle the error
        return;
      }
      console.log('User updated successfully:', updatedUser);
      res.json(updatedUser); // Return the updated user as a response
    });
  });
  
router.post("/login",loginvalidation,validation,Login)
router.get("/logout",Logout)
router.post('/forgot-password', resetPasswordController.sendResetPasswordEmail);
router.post('/reset-code', resetPasswordController.handleResetPasswordCode);
router.put("/reset-password", resetPasswordController.handleResetPasswordUpdate); 



module.exports = router;