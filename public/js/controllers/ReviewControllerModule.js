angular.module('ReviewControllerModule',[]).controller('ReviewController',function($scope,$location,ReviewService,$filter,$stateParams,$rootScope){
    console.log("Reviewcontroller");
    $scope.Status="";
    $scope.currentConferenceId = $stateParams.confId;
    $scope.comments="";
    $scope.summary="";
    $scope.strongPoints="";
    $scope.weakPoints="";
    $scope.submission="";
    $scope.Expertise = {
        level: 'Average'
    };
    $scope.Evaluation = {
        level: 'Neutral'
    };

    ReviewService.getDetails($scope.currentConferenceId,$rootScope.user._id).then(function(submissionObject){
        $scope.submission=submissionObject.data.submissionID;
        $scope.conference=submissionObject.data.conferenceID;
        $scope.comments=submissionObject.data.comments;
        $scope.summary=submissionObject.data.summary;
        $scope.strongPoints=submissionObject.data.strongPoints;
        $scope.weakPoints=submissionObject.data.weakPoints;
        $scope.Expertise.level=submissionObject.data.reviewerExpertise;
        $scope.Evaluation.level=submissionObject.data.overallEvaluation;
        console.log($scope.conference);
        $scope.displayFields();
    });
    $scope.displayFields=function(){
        var date = new Date();
        var presentDate = date.toJSON();
        if(presentDate<$scope.conference.submissionEndDate){$scope.Status="Submission Stage";console.log($scope.Status);}
        else if(presentDate>$scope.conference.submissionEndDate && presentDate<$scope.conference.reviewEndDate){$scope.Status="Review Stage";console.log($scope.Status);}
        else if(presentDate>$scope.conference.reviewEndDate){$scope.Status="Ended";console.log($scope.Status);}
    };

    $scope.saveReview = function(){
        $scope.review={
            conferenceID:$scope.currentConferenceId,
            subId:$scope.submission._id,
            comments:$scope.comments,
            summary:$scope.summary,
            strongPoints:$scope.strongPoints,
            weakPoints:$scope.weakPoints,
            overallEvaluation:$scope.Evaluation.level,
            reviewerExpertise:$scope.Expertise.level

        };
        console.log($scope.review);
        ReviewService.addReview($scope.review).then(function(review){
        console.log(review.data)
        })
    }
});