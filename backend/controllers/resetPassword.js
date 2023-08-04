const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

var User = require('../models/user');

// Configuration de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pidevtestapp@gmail.com',
    pass: 'yctmbkalhhenzgbj',
  },
});

// Générer un code à 6 chiffres
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Étape 1: Envoyer un e-mail de réinitialisation du mot de passe avec le code
exports.sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Cet e-mail n'existe pas dans notre système." });
    }

    const code = generateCode(); // Générer un code à 6 chiffres

    // Enregistrez le code dans la base de données pour vérification ultérieure
    user.resetPasswordCode = code;
    await user.save();

    // Créez l'e-mail de réinitialisation du mot de passe avec le code
    const mailOptions = {
      from: 'pidevtestapp@gmail.com',
      to: email,
      subject: 'Réinitialisation du mot de passe - Votre Application',
      html: `<p>Votre code de réinitialisation du mot de passe est : <strong>${code}</strong></p>`,
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
      } else {
        console.log('E-mail envoyé : ' + info.response);
        return res.status(200).json({ message: "Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail de réinitialisation du mot de passe." });
  }
};

// Étape 2: Vérifier le code de réinitialisation saisi par l'utilisateur
exports.handleResetPasswordCode = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({ resetPasswordCode: code });

    if (!user) {
      return res.status(400).json({ message: "Code de réinitialisation invalide." });
    }

    // Code de réinitialisation valide, redirigez l'utilisateur vers la page /reset-password
    res.status(200).json({ message: "Code de réinitialisation valide." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la vérification du code de réinitialisation." });
  }
};

exports.handleResetPasswordUpdate = async (req, res) => {
  const { code, password } = req.body;

  try {
    // Mettre à jour le mot de passe de l'utilisateur
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.findOneAndUpdate(
      { resetPasswordCode: code },
      { password: hashedPassword, resetPasswordCode: null },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "Code de réinitialisation invalide." });
    }

    // Mot de passe mis à jour avec succès
    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du mot de passe." });
  }
};
