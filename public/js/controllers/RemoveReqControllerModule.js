angular.module('RemoveReqControllerModule',[]).controller('RemoveReqController',function($scope,$location,PreReqService,$state,$window,$rootScope) {

//Separate Controller for priv/remove
//Get all granted users on page-load of Manage_Pri.html
    PreReqService.GetGranted().then(function (user) {
        $scope.result = user.data;
        //$state.go($state.current, {}, {reload: true});
    });

    $scope.Remove = function (id) {
        PreReqService.Remove(id._id).then(function () {
            $state.go($state.current, {}, {reload: true});
        });
    }
});