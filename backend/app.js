const express = require("express");
const connection = require("./config");
const app = express();
const port = 8000;
connection();
const userroute = require("./routes/UtilisateurRoute");
var cors = require("cors");
var userRouter = require("./routes/user");
var tutoRouter = require("./routes/tutorial");
var usertutoRouter = require("./routes/userTutoR");
var paramsRouter = require("./routes/params");
var resetPasswordController = require('./controllers/resetPassword'); 

app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.use(express.json());
app.use("/user", userRouter);
app.use("/tuto", tutoRouter);
app.use("/userTuto", usertutoRouter);
app.use("/User", userroute);
app.use("/params", paramsRouter);
app.use('/forgot-password', resetPasswordController.sendResetPasswordEmail); 
app.use('/reset-code', resetPasswordController.handleResetPasswordCode);
app.use('/reset-password', resetPasswordController.handleResetPasswordUpdate);



app.listen(port, () => {
  console.log(
    `Le serveur est en cours d'exécution sur http://localhost:${port}`
  );
});
