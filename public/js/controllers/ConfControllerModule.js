angular.module('ConfControllerModule',[]).controller('ConfController',function($scope,ConfService,$location,$state,$rootScope,userService){
    console.log("ConfController");
   // $scope.chairOption={};
   /* createConfService.FetchChairPersons().then(function(chairPersons){
        console.log(chairPersons);
        $scope.chair=[];
        angular.forEach(chairPersons.data,function(type,index){
            angular.forEach(type,function(value,index){
                $scope.chair.push(value)
            })
        });
        console.log($scope.chair);
    });*/

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

        id=$rootScope.user._id;
        $scope.conference={createdBy:id,conferenceTitle:$scope.conferenceName, conferenceDescription:$scope.conferenceDescription,
            submissionEndDate:$scope.submissionDeadline,reviewEndDate:$scope.reviewDeadline,department:$scope.department};
            //console.log($scope.conference);
      /*  for(var i=0;i<$scope.chairMemberList.length;i++)
        {
            console.log($scope.chairMemberList[i].email);
        }*/
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


    ConfService.ListConference().then(function(conf){
        $scope.result_allconf=conf.data;

    });


    $scope.Join = function(x) {

        //Accept/Reject requests
        console.log('Joining the conf');
        //id=$rootScope.user._id;
        var userId= $rootScope.user._id;
        var confId= x._id;
        console.log(userId+"      "+confId);
        ConfService.Join(userId, confId).then(function (data) {
            $state.go($state.current, {}, {reload: true});
        })
    };
});