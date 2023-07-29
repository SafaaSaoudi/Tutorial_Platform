const express = require("express");
const connection = require("./config");
const app = express();
const port = 8000;
connection();
const userroute = require('./routes/UtilisateurRoute');

var cors = require("cors");
var userRouter = require('./routes/user');
var tutoRouter = require('./routes/tutorial');
var usertutoRouter = require( './routes/userTutoR' );

app.use(cors());

app.use( express.json() )
app.use('/user',userRouter);
app.use('/tuto',tutoRouter);
app.use( '/userTuto', usertutoRouter );
app.use("/User", userroute);


app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});
