angular.module('LoginControllerModule',[]).controller('LoginController',function($scope,$location,loginService){
    console.log("logincontroller");

    $scope.login = function(){
        var email = $scope.email;
        var password = $scope.password;

        loginService.loginUser(email,password).then(function(datafromserver){
            var result=datafromserver.data;

            if(result.state=="failure"){
                $scope.message=result.message;
            }else{
                $scope.message="logged in";
            }

        });
    }
});