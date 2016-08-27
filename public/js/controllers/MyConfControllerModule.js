angular.module('MyConfControllerModule',[]).controller('MyConfController',function($scope,MyConfService,$location,$state,$rootScope,$stateParams){
    console.log("MyConfController");

        var x1 = $stateParams.confId;
    console.log(x1);

});