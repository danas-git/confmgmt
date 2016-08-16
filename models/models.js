var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    _id: Number,
    email: String,
    password: String, //hash created from password
    firstName: String,
    lastName: String,
    postaladdress: String,
    city: String,
    state: String,
    country: String,
    institution: String,
    privilege: String,
    status: String
});

var confSchema = new mongoose.Schema({
    _id: Number,
    conf_Name: String,
    created_Date: Date,
    sub_End_Date: Date,
    review_End_Date: Date,
    owner: {type: Schema.ObjectId, ref:'User'},
    chair: [{type: Schema.ObjectId, ref: 'User'}]

});

var submissionSchema = new mongoose.Schema({
    conf_Id: {type: Number, ref: 'Conf'},
    submitter: {type: Schema.ObjectId, ref: 'User'},
    sub_Date: Date,
    summary: String,
    fke_Path: String,
    reviewer: {type: Schema.ObjectId, ref: 'User'},
    rev_Date: Date,
    feedback: String,
    rating: String
});

mongoose.model('User', userSchema);
mongoose.model('Conf', confSchema);
mongoose.model('Sub', submissionSchema);