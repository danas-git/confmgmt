angular.module('ReviewControllerModule',[]).controller('ReviewController',function($scope,$location,ReviewService,$filter,$stateParams,$rootScope){
    console.log("Reviewcontroller");
    $scope.currentConferenceId = $stateParams.confId;
    $scope.comments="";
    $scope.summary="";
    $scope.strongPoints="";
    $scope.weakPoints="";
    $scope.submission="";
   // $scope.overallEvaluation ={text: "Neutral"};
   // $scope.reviewerExpertise ={text: "Not Familiar"};
   /* $scope.Expertise = [
        { text: 'Not Familiar'},
        { text: 'Novice'},
        { text: 'Average'},
        { text: 'Good'},
        { text: 'Expert'}
    ];
    $scope.Evaluation = [
        { text: 'Strong Reject'},
        { text: 'Partial Reject'},
        { text: 'Neutral'},
        { text: 'Partial Accept'},
        { text: 'Strong Accept'}
    ];

    $scope.showExpertise = function() {
        var selected = $filter('filter')($scope.Expertise, {text: $scope.reviewerExpertise.text});
        return ($scope.reviewerExpertise.text && selected.length) ? selected[0].text : $scope.reviewerExpertise;
    };

    $scope.showEvaluation = function() {
        var selected = $filter('filter')($scope.Evaluation, {text: $scope.overallEvaluation.text});
        return ($scope.overallEvaluation.text && selected.length) ? selected[0].text : $scope.overallEvaluation;
    };*/

    ReviewService.getDetails($scope.currentConferenceId,$rootScope.user._id).then(function(submissionObject){
        $scope.submission=submissionObject.data.submissionID;
        console.log(submissionObject.data);
        $scope.comments=submissionObject.data.comments;
        $scope.summary=submissionObject.data.summary;
        $scope.strongPoints=submissionObject.data.strongPoints;
        $scope.weakPoints=submissionObject.data.weakPoints;

    });

    $scope.saveReview = function(){
        $scope.review={
            conferenceID:$scope.currentConferenceId,
            subId:$scope.submission._id,
            comments:$scope.comments,
            summary:$scope.summary,
            strongPoints:$scope.strongPoints,
            weakPoints:$scope.weakPoints,
          ///  overallEvaluation:$scope.overallEvaluation.text,
           // reviewerExpertise:$scope.reviewerExpertise.text
        };
        console.log($scope.review);
        ReviewService.addReview($scope.review).then(function(review){
        console.log(review.data)
        })
    }
});