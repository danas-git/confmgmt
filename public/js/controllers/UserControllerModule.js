angular.module('UserControllerModule',[]).controller('UserController',function($scope,$location,userService){
    console.log("usercontroller");
    $scope.registerNewUser = function(){
        var firstname= $scope.firstname;
        var lastname = $scope.lastname;
        var email = $scope.email;
        var password = $scope.password;
        var confirmpassword = $scope.confirmpassword;
        var institution = $scope.institution;
        console.log(firstname);
        $scope.message="";
        if(password==confirmpassword){

            userService.registerUser(firstname,lastname,email,password,institution).then(function(datafromserver){
                var result=datafromserver.data;

                if(result.state=="failure"){
                    $scope.message=result.message;
                }else{
                    $scope.message="User Successfully added";
                    $location.url('/');

                }

            });
        }else{
            $scope.message="Passwords do not match";
        }

    }

});