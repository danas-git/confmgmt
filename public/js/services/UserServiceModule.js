angular.module('UserServiceModule',[]).factory('userService',['$http',function($http){
    console.log("userservice");
    return {
        registerUser : function(firstname,lastname,email,password,institution){
            return $http.post("/users/register",
            { params: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                institution: institution
            }
            });
        }
    }

}]);