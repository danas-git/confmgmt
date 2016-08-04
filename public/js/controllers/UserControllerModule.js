angular.module('UserControllerModule',[]).controller('UserController',function($scope,$location,userService){
    console.log("usercontroller");
    $scope.registerNewUser = function(){
        var firstname= $scope.firstname;
        var lastname = $scope.lastname;
        var email = $scope.email;
        var password = $scope.password;
        var confirmpassword = $scope.confirmpassword;
        var instituion = $scope.institution;
        console.log(firstname);
        $scope.message="";
        if(password==confirmpassword){

            userService.registerUser(firstname,lastname,email,password,instituion).then(function(datafromserver){
                console.log(datafromserver);
            });
        }

    }

});