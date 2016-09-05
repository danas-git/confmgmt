var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
var Review = mongoose.model('Review');
var Submission = mongoose.model('Submission');


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

router.use('/getDetails', isAuthenticated);
router.use('/addReview',isAuthenticated);


router.route('/getDetails')
    .get(function(req,res) {
        console.log(req.param('condId'));
        Review.findOne({'conferenceID':req.param('confId'),'reviewerID':req.param('userId')}).populate({path:'submissionID conferenceID'}).exec(function(err,data1){
            if (data1) {
                res.json(data1);
            }else{
                res.send("notassigned");
            }
        });
    });



router.route('/addReview')
    .post(function(req,res) {
        var currentDate=new Date();
        var currDate=currentDate.toJSON();

        Conference.find({'_id':req.body.conferenceID,'reviewEndDate':{$gte:currDate},'submissionEndData':{$lte:currDate}},function(err,data){
            if(data){
                Review.update({'conferenceID':req.body.review.conferenceID,'submissionID':req.body.review.subId},{$set:{
                    reviewerExpertise:req.body.review.reviewerExpertise,
                    comments:req.body.review.comments,
                    summary:req.body.review.summary,
                    strongPoints:req.body.review.strongPoints,
                    weakPoints: req.body.review.weakPoints,
                    reviewStatus:"complete",
                    overallEvaluation:req.body.review.overallEvaluation
                }},function(err,data){
                    if(data){ console.log("updating");res.send(data)}
                    if(err){res.send.err}
                });

            }
            else res.send("no conf exist");
        });
       /* Conference.findOne({'_id':req.body.review.conferenceID,submissionEndDate: {$lte: currDate}},function(err,data){
            if(data){
                console.log("add review");
                console.log(data);
                Conference.findOne({'_id':req.body.review.conferenceID,reviewEndDate: {$gte: currDate}},function(err,data2){
                   if(data2) {
                        Review.update({'submissionID':req.body.review.subId},req.body.review,function(err,body){
                        if(err){
                        console.log("error on review update"+err);
                        }
                        else{
                        res.json(body);
                        }
                        });
                        }else{
                        res.send("reviewperiodover")
                        }
                })  ;

            }else{
                res.send("reviewnotstarted")
            }
        });*/
    });


module.exports = router;
