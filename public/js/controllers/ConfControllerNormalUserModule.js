angular.module('ConfControllerNormalUserModule',[]).controller('ConfControllerNormalUser',function($scope,ConfServiceNormal,$location,$state,$rootScope) {
    console.log("ConfControllerNormalUser");

    var x= $rootScope.user._id;
    ConfServiceNormal.ListConferenceNormal(x).then(function(conf){
        $scope.conferenceData=conf.data;
        console.log($scope.conferenceData);
       });
});
