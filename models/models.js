var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    email: string,
    password: String, //hash created from password
    postal_address: string,
    institution: string,
    city: string,
    state: string,
    country: string,
});


mongoose.model('User', userSchema);
