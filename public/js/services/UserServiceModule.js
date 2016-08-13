angular.module('UserServiceModule',[]).factory('userService',['$http',function($http){
    console.log("userservice");
    return {
        registerUser : function(firstname,lastname,email,password,institution,postaladdress,city,state,country){
            return $http.post("/users/register",
            {
                firstname: firstname,
                lastname: lastname,
                username: email,
                password: password,
                institution: institution,
                postaladdress: postaladdress,
                city: city,
                state: state,
                country: country
            });
        }
    }

}]);