var express = require('express');
var router = express.Router();
var Courses = require('../models/all_courses');
const cors = require('cors');

/* GET user DB. */
router.use(cors());

router.get('/getT',async function(req, res, next) {
    await Courses.find()
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error(error);
        // Handle the error
        res.status(500).send('Internal Server Error');
      });
  });


  /*router.get('/getT/:id', function(req, res, next) {
    Tutorial.findById(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error(error);
        // Handle the error
        res.status(500).send('Internal Server Error');
      });
  });*/


/* POST 2*/
router.post('/addT', function(req,res,next) {
    new Courses(
        {title:req.body.title, 
          description:req.body.description
        }
        ).save();
    res.send("Added");
});
/* Delete user*/
router.post('/deleteT/:id', function(req,res,next){
  Courses.findByIdAndRemove(req.params.id, 
        function (err, docs) {
        if (err)
            console.log(err);
        res.send("tuto deleted");
    })
})

/*update user*/
router.put('/updateT/:id', function(req, res, next) {
    const updatedTuto = {
      title:req.body.title, 
      description:req.body.description 
    };
  
    Courses.findByIdAndUpdate(req.params.id, updateData, { new: true }, (err, updatedUser) => {
      if (err) {
        console.error(err);
        // Handle the error
        return;
      }
      console.log('tuto updated successfully:', updatedUser);
      res.json(updatedTuto); // Return the updated user as a response
    });
  });
  

module.exports = router;