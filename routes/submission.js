var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var multer = require('multer');
var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
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

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
       // cb(null, req.session.lastsubmissionid+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        cb(null, req.session.lastsubmissionid+ '.pdf')
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

router.use('/upload', isAuthenticated);
router.use('/getoldinfo',isAuthenticated);
router.use('/uploadinfo',isAuthenticated);
router.use('/getConfObject',isAuthenticated);

router.route('/upload')
    .post(function(req,res){
        console.log("from upload");
        console.log(req.session.lastsubmissionid);
        upload(req,res,function(err){
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }
            res.json({error_code:0,err_desc:null});
        })
    });
router.route('/getConfObject')
    .post(function(req,res){
        Conference.findOne({'_id':req.body.confId}).populate({path:'conferenceMembers',model:'User',match:{_id:{$ne:req.body.userId}}}).exec(function(err,data){
            if(data){
                res.json(data);
            }
        });
    });

router.route('/getoldinfo')
    .post(function(req,res) {
        Submission.findOne({'submittedBy':req.body.user._id,'confID':req.body.conference._id}).populate({path:'reviewID',model:'Review'}).exec(function(err,data1){
            if (data1) {
                res.json(data1);
            }
        });
    });

router.route('/uploadinfo')
    .post(function(req,res){
        Submission.findOne({'submittedBy':req.body.user._id,'confID':req.body.conference._id},function(err,data1){
            if(data1){
                req.session.lastsubmissionid=data1._id;
                Submission.update({'_id':data1._id},req.body.submission,function(err,body){
                    if(err){}
                    else{res.json(body);}
                });
            }else{
                var submission = new Submission(req.body.submission);
                submission.save(function(err,data2){
                    if (err){
                        console.log('Error in Saving submission: '+err);
                        throw err;
                    }else{
                        console.log(data2);
                        User.update({'_id':req.body.user._id},{$push: {'mySubmission':data2._id}},function(err,data){
                            if(err)
                                throw(err);
                            else{
                                Conference.update({'_id':req.body.conference._id},{$push: {'conferenceSubmissions':data2._id}},function(err,data){
                                    if(err)
                                        throw(err)
                                    else{

                                        req.session.lastsubmissionid=data2._id;
                                        console.log("submission saved successfully");
                                        res.send({message: "submission saved successfully"});
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });

    });

module.exports = router;