var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()){
        return next();
    }
    res.send('401');
}
router.use('/data', isAuthenticated);

router.route('/data')
    .post(function(req,res){
        console.log(req.body.firstName);
        console.log(req.body.id);
        User.findOneAndUpdate({'_id': req.body.id},{$set: {"firstName": req.body.firstName, "lastName": req.body.lastName, "institution": req.body.institution,"city":req.body.city,"state":req.body.state,"country":req.body.country}}).exec(function(err,User){
            if(err){
                console.log(err);
            }
            else{
                res.send(User);
            }
        });
    })
    .get(function(req,res){
        console.log("inside get method");
        console.log(req.param('id'));
        User.findOne({_id: req.param('id')}, function (err,User) {
            res.send(User);
        });
    });

module.exports = router;