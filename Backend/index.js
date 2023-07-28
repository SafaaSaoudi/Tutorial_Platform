const express = require("express");
const userroute = require("./Routes/UtilisateurRoute");
const connection = require("./config");
const app = express();
const port = 8520;
connection();
var cors = require("cors");
app.use(cors());

app.use(express.json())

app.use("/User", userroute);
app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});
