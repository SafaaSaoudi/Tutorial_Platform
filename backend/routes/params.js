var express = require("express");
var router = express.Router();
var params = require("../models/params");

/** Get Params */
router.get("/", async function (req, res, next) {
  try {
    const data = await params.find().exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

/** Add Params */
router.post("/add", async function (req, res, next) {
  try {
    await new params({ name: req.body.name }).save();
    res.send("Added");
  } catch (err) {
    next(err);
  }
});

/* Delete params*/
router.post("/delete/:id", async function (req, res, next) {
  try {
    await params.findByIdAndRemove(req.params.id).exec();
    res.send("params deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
