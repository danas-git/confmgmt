var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    email: String,
    password: String, //hash created from password
    firstName: String,
    lastName: String,
    institution: String,
    privilege: String,
    status: String
});

mongoose.model('User', userSchema);