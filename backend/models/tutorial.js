
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Tutorial = new Schema({
    id: Number,
    metadata:Object,
});
module.exports = mongoose.model('tutorials',Tutorial);