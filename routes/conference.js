var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Conference = mongoose.model('Conference');

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
router.use('/createConf', isAuthenticated);
router.use('/allconferences', isAuthenticated);
router.use('/myconferences', isAuthenticated);

router.route('/createConf')
    .post(function(req,res){
        console.log("creating conf");
        Conference.findOne({'conferenceTitle':req.body.conferenceTitle}, function(err,data){
           if(err){res.send(err);}
           if(data){res.send({message:"conference name already exist"})}
           else{
              var newConference = new Conference();
              newConference.conferenceTitle=req.body.conferenceTitle;
              newConference.conferenceDescription=req.body.conferenceDescription;
              newConference.submissionEndDate=req.body.submissionEndDate;
              newConference.reviewEndDate=req.body.reviewEndDate;
              newConference.createdBy=req.body.createdBy;
              //  newConference.chairMembers=[];//;req.body.reviewEndDate;
              newConference.department=req.body.department;
              newConference.save(function(err) {
                  if (err){
                      console.log('Error in Saving conference: '+err);
                      throw err;
                  }else{
                      console.log("Conference successfully created");
                      return res.send({message: "Conference successfully created"});
                  }
              });
          }
       });
    });

router.route('/myconferences/normal')
    .post(function(req,res){
        var userId=req.body.userId;
        console.log('Inside my conferences/normal.......userId: '+userId);
        User.findOne({_id:userId}).populate('myConference').exec(function(err,conf){
            if(err){
                return res.send(500, err);
            }
            return res.send(200,conf);
        });
    });

router.route('/allconferences')
    .get(function(req,res){
        console.log('Before Find all conf function');
        var currDate = new Date();
        var jasondate = currDate.toJSON();
        Conference.find({submissionEndDate: {$gte: jasondate}}, function(err,conf){
            if(err){
                return res.send(500, err);
            }
            return res.send(200,conf);
        })
    });

router.route('/allconferences/join')
    .post(function(req,res){
        console.log("creating conf");
        var userId=req.body.userId;
        var confId=req.body.confId;
        console.log(userId+"   "+confId);
        User.update({'_id': userId}, {$push: {'myConference':confId}}, function (err,data) {
            if(err)
                throw err;
            else
                Conference.update({'_id': confId}, {$push: {'conferenceMembers': userId}}, function(err,data){
                    if (err)
                        throw err;
                    else
                        res.send(200,data);
                })
        })
    });
router.route('/showconf/chair/:confId')
    .get(function(req,res){
        console.log('Before Find my conf function of the chair');
        // var confId=req.params.confId;
        console.log("confid................................."+req.confId);
        //Conference.find({'_id': confId}, function(err,conf){
        //    if(err){
        //        return res.send(500, err);
        //    }
        //    return res.send(200,conf);
    });

module.exports = router;

