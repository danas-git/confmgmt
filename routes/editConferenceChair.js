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
router.use('/updateDate', isAuthenticated);
router.use('/close', isAuthenticated);

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

router.route('/updateDate/submission')
    .post(function(req,res) {
        console.log(req.body.subDate);
        console.log(req.body.confId);
        Conference.update({'_id': req.body.confId}, {$set: {'submissionEndDate': req.body.subDate}}, function (err, body) {
            if (err) {
                console.log("some error while updating submission end date");
            }
            if(body) {
                res.send({message: "submission deadline updated"});
            }

        })
    });

router.route('/updateDate/review')
    .post(function(req,res) {
        console.log(req.body.revDate);
        console.log(req.body.confId);
        Conference.update({'_id': req.body.confId}, {$set: {'reviewEndDate': req.body.revDate}}, function (err, body) {
            if (err) {
                console.log("some error while updating submission end date");
            }
            if(body) {
                res.send({message: "review deadline updated"});
            }

        })
    });

router.route('/close/submission')
    .post(function(req,res) {
 var date= new Date();
        var currentDate=date.toJSON();
        console.log(req.body.confId);
        Conference.update({'_id':req.body.confId},{$set:{'submissionEndDate':currentDate}}, function(err,body){
            if (err) {
                console.log("some error while closing submission");
            }
            if(body) {
                res.send({message: "submission successfully closed"});
            }
        })
    });
router.route('/close/review')
    .post(function(req,res) {
        var date= new Date();
        var currentDate=date.toJSON();
        console.log(req.body.confId);
        Conference.update({'_id':req.body.confId},{$set:{'reviewEndDate':currentDate}}, function(err,body){
            if (err) {
                console.log("some error while closing review");
            }
            if(body) {
                res.send({message: "review successfully closed"});
            }
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