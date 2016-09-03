angular.module('ConfControllerModule',[]).controller('ConfController',function($scope,ConfService,$location,$state,$rootScope){
    console.log("ConfController");
    //$scope.chairMemberList = "";
    /*var submissionDate = document.getElementById('submissionDate');
    var reviewDate = document.getElementById('reviewDate');
    submissionDate.addEventListener('change',function () {
        if(submissionDate.value)
            reviewDate.min = submissionDate.value;
    },false);
    reviewDate.addEventListener('change',function () {
        if(reviewDate.value)
            submissionDate = reviewDate.value;
    },false);*/

    $scope.createConference= function () {
        var id=$rootScope.user._id;
        $scope.conference={createdBy:id,conferenceTitle:$scope.conferenceName, conferenceDescription:$scope.conferenceDescription,
            submissionEndDate:$scope.submissionDeadline,reviewEndDate:$scope.reviewDeadline,department:$scope.department};
        ConfService.CreateConference($scope.conference).then(function(message){
            console.log(message.data.message);
            $scope.message2=message.data.message;
            $scope.conferenceName="";
            $scope.conferenceDescription="";
            $scope.submissionDeadline="";
            $scope.reviewDeadline="";
            $scope.department="";
        });
    };

    $scope.isAdded= function(object){
        $scope.flag=false;
        angular.forEach(object.conferenceMembers,function(value,index){
            if(value==$rootScope.user._id){
                $scope.flag=true;}
        });
        return $scope.flag;
    };

    ConfService.ListConference().then(function(conf){
        $scope.result_allconf=conf.data;
        console.log($scope.result_allconf);
        $scope.id1=$rootScope.user._id;
    });

    $scope.Join = function(x) {
        console.log('Joining the conf');
        var userId= $rootScope.user._id;
        var confId= x._id;
        console.log(userId+"      "+confId);
        ConfService.Join(userId, confId).then(function (data) {
            $state.go($state.current, {}, {reload: true});
        })
    };
});