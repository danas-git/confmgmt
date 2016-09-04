angular.module('ConfControllerNormalUserModule',[]).controller('ConfControllerNormalUser',function($scope,ConfServiceNormal,$location,$state,$rootScope) {
    console.log("ConfControllerNormalUser");

    var x= $rootScope.user._id;
    ConfServiceNormal.ListConferenceNormal(x).then(function(conf){
        $scope.conferenceData=conf.data;
        console.log($scope.conferenceData);
       });

    $scope.getStatus=function(data){
        console.log(data);
        var date = new Date();
        var presentDate = date.toJSON();
        if(presentDate<data.submissionEndDate){$scope.Status="Submission Stage"; console.log($scope.Status); return $scope.Status;}
        else if(presentDate>data.submissionEndDate && presentDate<data.reviewEndDate){$scope.Status="Review Stage";console.log($scope.Status);return $scope.Status;}
        else if(presentDate>data.reviewEndDate){$scope.Status="Ended";console.log($scope.Status);return $scope.Status;}
    };


});
