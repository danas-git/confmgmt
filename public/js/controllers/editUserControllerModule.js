angular.module('editUserControllerModule',[]).controller('editUserController',function($scope,$location,$state,$rootScope,userService){
    console.log("EditUserController");
    $scope.user;
    //$scope.id=$rootScope.user._id;
    userService.getUserInfoByEmailid($rootScope.user._id).then(function(userData){
        data=userData.data;
        console.log(data);
        $scope.user=data;
    });
    $scope.saveUserInfo = function () {
        var firstName = $scope.user.firstName;
        var lastName = $scope.user.lastName;
        var institution = $scope.user.institution;
        var city = $scope.user.city;
        var state = $scope.user.state;
        var country = $scope.user.country;
        var id = $scope.user._id;
        userService.saveUserInfo(id,firstName,lastName,institution,city,state,country).then(function (dataFrmServer){
            console.log(dataFrmServer);
            $scope.user=dataFrmServer.data;
           // if(dataFrmServer.data!=""){
                //alert("User Info Updated!!");
           // }
            $state.go($state.current, {}, {reload: true});
        });
    }

});