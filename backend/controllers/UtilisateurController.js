const Users = require( "../models/user" );
const bcrypt = require("bcrypt");
exports.AjouterUtilisateur = async ( req, res ) =>
{
  
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(req.body.password, 0);

    var user = new Users();
    
    user.name = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.image =  `${req.protocol}://${req.get("host")}/Uploads/${
      req.files[0].filename
    }`;
      user.role = "user";
console.log(user)
    user.save();
    res.status(200).json({ message: "User added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add user." });
  }
};


exports.findUsersEmails = async ( req, res ) =>
{
  tab = [];
  utilisateur = Users.find().then( ( us ) =>
  {
    
    for ( Uti of us )
    {
     
      tab.push(Uti.email)
    }
   
    res.send( tab );
  } )
 
  
};