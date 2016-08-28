angular.module('SubmissionControllerModule',['ngFileUpload']).controller('SubmissionController',function($scope,$location,submissionService,$state,$stateParams,$rootScope,Upload){
    console.log("submission controller");
    $scope.message="";
    $scope.alreadysubmitted=false;

   // var conference = $stateParams.selectedconf;
   console.log($stateParams.confId);

    submissionService.getConfObject($stateParams.confId,$rootScope.user._id).then(function(datafromserver){
        console.log("insideget confid");
        var conference = datafromserver.data;
        $scope.coauthors=conference.conferenceMembers;
        submissionService.getoldinfo(conference,$rootScope.user).then(function(datafromserver){
                                console.log(datafromserver.data);
                                $scope.sub=datafromserver.data;
                                $scope.alreadysubmitted=true;
            });
    });

    $rootScope.isRole= function(role){
        // console.log(role);
        if(role==$rootScope.user.privilege){
            return true;
        }else{
            return false;
        }
    };

    $scope.uploadDoc = function(){

    submissionService.getConfObject($stateParams.confId,$rootScope.user._id).then(function(datafromserver){
            var conference = datafromserver.data;

    var subenddate = new Date(conference.submissionEndDate);
    var currentdate = new Date();
    if(currentdate<subenddate){

    var submission = {
            submissionTitle: $scope.sub.submissionTitle,
            coAuthors: $scope.sub.coAuthors,
            abstract: $scope.sub.abstract,
            keywords: $scope.sub.keywords,
            filePath: "/uploads/",
            submittedBy: $rootScope.user._id,
            confID: conference._id,
            submissionStatus: "complete"
    }
        if ($scope.sub.uploadFile) {
            submissionService.uploadinfo(conference,$rootScope.user,submission).then(function(datafromserver){
                    console.log("returned after updating info");

                    Upload.upload({
                                       url: 'submission/upload',
                                       data: {file: $scope.sub.uploadFile}
                                           }).then(function (resp) {
                                             console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                                             $scope.message="Submitted Successfully";

                                            }, function (resp) {
                                            console.log('Error status: ' + resp.status);
                                            }, function (evt) {
                                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                            $scope.progress='Upload: ' + progressPercentage + '% ';
                                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                                 });

                    });

              }
    }else{
    $scope.message="Submission EndDate is over";
    }
    });
    }

});