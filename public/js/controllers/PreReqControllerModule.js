angular.module('PreReqControllerModule',[]).controller('PreReqController',function($scope,$location,PreReqService,$state,$window,$rootScope){
    console.log("PreReqcontroller");

    $scope.Submit = function(){
        var comments = $scope.comments;
        console.log(comments);
        id=$rootScope.user._id;
console.log(id);
        PreReqService.Submit(comments,id).then(function(message){
            // var message=datafromserver.data;

             if(message=="failure"){
             $scope.message1=message;
             }else{
             $scope.message1="Comment Posted";
             $state.go('home.requestForPrivilege');
             }
        });
    }
});