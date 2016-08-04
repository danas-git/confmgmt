var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var bCrypt = require('bcrypt-nodejs');

router.post('/register',function(req,res){
   console.log("register");
    console.log(req.body.params.password);
    var hashpassword=createHash(req.body.params.password);
    //User.findOne({'email':req.body.params.email},function(err,))
    var newUser= new User();
    newUser.email= req.body.params.email;
        newUser.password= hashpassword; //hash created from password
        newUser.firstName= req.body.params.firstname;
        newUser.lastName= req.body.params.lastname;
        newUser.institution= req.body.params.institution;
        newUser.privilege= "normal";
        newUser.status= "granted";
    newUser.save(function(err){
        if(err){
            console.log("Error registering user");
        }
        else{
            res.send("success");
        }
    })
});

var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
};

module.exports=router;