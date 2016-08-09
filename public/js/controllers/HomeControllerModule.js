angular.module('HomeControllerModule',[]).controller('HomeController',function($scope,$location,homeService,$state,$rootScope){
    console.log("homecontroller");


    $scope.logout= function(){
        homeService.logout().then(function(){
            $rootScope.authenticated=false;
            $state.go('/');
        });
    }

});