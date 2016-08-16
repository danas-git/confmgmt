angular.module('LoginControllerModule',[]).controller('LoginController',function($scope,$location,loginService,$window,$state,$rootScope){
    console.log("logincontroller");

    $rootScope.authenticated=false;


    $rootScope.isAuthenticated= function(){
        return $rootScope.authenticated;
    }

    $rootScope.isRole= function(role){
        console.log(role);
        console.log($rootScope.user.privilege);
        if(role==$rootScope.user.privilege){
            return true;
        }else{
            return false;
        }
    }

    $scope.login = function(){
        var email = $scope.email;
        var password = $scope.password;

        loginService.loginUser(email,password).then(function(datafromserver){
            var result=datafromserver.data;

            if(result.state=="failure"){
                $scope.message=result.message;
            }else{
                $scope.message="logged in";
                $rootScope.authenticated=true;
                //$location.url('/home/welcome');
                //$window.location.reload();
                $rootScope.user=result.user;
                $state.go('home.welcome');
            }

        });
    }
});