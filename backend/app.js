const express = require("express");
const connection = require("./config");
const app = express();
const port = 8000;
connection();

var cors = require("cors");
app.use(cors());

app.use( express.json() )

app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});
