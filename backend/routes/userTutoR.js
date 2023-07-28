var express = require('express');
var router = express.Router();
var UserTutorial = require('../models/userTuto');
const cors = require('cors');

// Assuming you have already required the necessary modules and defined the UserTutorial model.

// Assuming you have already required the necessary modules and defined the UserTutorial model.

router.use(cors());
router.options('/addUT', cors());
router.options('/deleteUT/:id', cors());

router.get('/getUT', async function(req, res, next) {
  try {
    const data = await UserTutorial.find()
      .populate('utilisateur', 'name email')
      .populate('tutorial', 'metadata');

    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.post('/deleteUT/:id', async function (req, res, next) {
  try {
    const deletedTutorial = await UserTutorial.findByIdAndRemove(req.params.id);
    if (deletedTutorial) {
      res.send("User tutorial deleted");
    } else {
      res.status(404).send("User tutorial not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while deleting user tutorial.");
  }
});

router.get('/getUT/:id', function(req, res, next) {
    UserTutorial.findById(req.params.id)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        console.error(error);
        // Handle the error
        res.status(500).send('Internal Server Error');
      });
  });


// Route pour ajouter une relation entre un utilisateur et un tutoriel
router.post('/addUT', async function(req, res, next) {
  try {
    const {tutorialId,utilisateurId } = req.body;
    // Créez une entrée dans la table "user_tutorials" pour lier l'utilisateur et le tutoriel
    const relationUserTutorial = new UserTutorial({
      utilisateur: utilisateurId,
      tutorial: tutorialId
    });

    // Sauvegardez la relation dans la base de données
    await relationUserTutorial.save();

    res.send("Relation utilisateur-tutoriel ajoutée avec succès.");
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'ajout de la relation utilisateur-tutoriel :', error);
    res.status(500).send('Erreur lors de l\'ajout de la relation utilisateur-tutoriel.');
  }
});

router.get('/getUTT/:_id', async function(req, res, next) {
  const { _id } = req.params; // Assuming you have a way to get the currently logged-in user's ID

  try {
    // Find the UserTutorials that match the user's ID
    const userTutorials = await UserTutorial.find({ utilisateur: _id }).populate('tutorial');

    // At this point, userTutorials will contain the UserTutorials associated with the user's ID
    res.json(userTutorials);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// Ajoutez ici d'autres routes pour mettre à jour, récupérer ou supprimer des relations utilisateur-tutoriel
module.exports = router;
