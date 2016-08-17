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
router.use('/new', isAuthenticated);
router.use('/remove', isAuthenticated);
router.use('/request', isAuthenticated);

router.route('/request')
    .post(function(req,res){
        console.log(req.body.userid);
        console.log(req.body.comments);
        User.update({'_id':req.body.userid},{$set:{"comment.userComment":req.body.comments}},function(err,body){
            if(err){console.log("some error while requesting privilege");}
            else{console.log("success");
                res.send({message: "success"});}
        })
    });
router.route('/new')
    .post(function(req, res){

    })

    .get(function(req,res){

    });

router.route('/remove')
    .get(function(req,res){

    })
    .post(function(req,res){

    });

module.exports = router;