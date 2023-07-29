// userTutorial.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserTutorial = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  tutorial: {
    type: Schema.Types.ObjectId,
    ref: 'tutorials'
  }
});

module.exports = mongoose.model('user_tutorials', UserTutorial);
