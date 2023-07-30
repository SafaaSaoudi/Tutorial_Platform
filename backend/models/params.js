var mongoose = require("mongoose");

var schema = mongoose.Schema;

var params = new schema({
  name: { type: String },
});

module.exports = mongoose.model("params", params);
