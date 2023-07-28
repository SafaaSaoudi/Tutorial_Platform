const jwt = require("jsonwebtoken");
const users = require("../models/utilisater");

exports.isAuth = async (req, res, next) => {
    try {
    const token = req.header("Authorization").split(" ")[1]; // Extract token from "Bearer {token}"

    const decode = jwt.verify(token, "hello");
    if (!decode) {
        res.status(400).send("You are not authorized");
    } else {
    const user = await users.findById(decode.id);
    res.status(200).send(user)
    next();
    }
    } catch (error) {
    res.status(500).send(error);
    }
};
