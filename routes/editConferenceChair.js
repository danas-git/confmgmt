var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
var Submission = mongoose.model('Submission');
var Review = mongoose.model('Review');
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
router.use('/getAuthors', isAuthenticated);
router.use('/assignReviewer', isAuthenticated);

router.route('/getAuthors')
    .get(function(req,res){
        Conference.find({'_id':req.param('confId')})
           .populate({
                path: 'conferenceSubmissions',
                match:{'submissionStatus': "complete"},
                populate: {path: 'submittedBy',
                select: '_id email'
                }
            }).exec(function(err,data){
                if(err){console.log('error: '+err);throw err;}
                if(data){res.json(data);}
                })
    });


router.route('/assignReviewer')
    .post(function(req,res){
        console.log(req.body.confId);
        console.log(req.body.subId);
        console.log(req.body.reviewerId);
        var currDate = new Date();
        var jasonDate = currDate.toJSON();
        console.log(jasonDate);
        Conference.findOne({'_id':req.body.confId,'reviewEndDate':{$gte:jasonDate}}, function(err,conf){
            if(err){
                return res.send(500, err);
            }
            if(conf){
                var newReview = new Review();
                newReview.reviewerExpertise = "";
                newReview.overallEvaluation ="NotEvaluated";
                newReview.summary="";
                newReview.weakPoints="";
                newReview.comments="";
                newReview.reviewStatus="incomplete";
                newReview.submissionID=req.body.subId;
                newReview.reviewerID=req.body.reviewerId;
                newReview.save(function(err,revObject) {
                    if (err){
                        console.log('Error in creating Review: '+err);
                        throw err;
                    }if(revObject){
                        console.log("Review successfully created"+revObject._id);
                        Submission.update({'_id':req.body.subId},{$set:{'reviewID':revObject._id}},function(err,data){
                           if(data){
                               Conference.find({'_id':req.body.confId})
                                   .populate({
                                       path: 'conferenceSubmissions',
                                       populate: {path: 'coAuthors submittedBy reviewID',
                                           populate:{path:'reviewerID',select:'firstName lastName email institution country city postalAddress'}
                                       }
                                   }).exec(function(err,data){
                                   if(err){console.log('error: '+err);throw err;}
                                   if(data){res.json(data);}
                               })
                           }
                        });
                    }
                });
            }
            else return res.send({message: "review ended"})
        })



    });

module.exports = router;