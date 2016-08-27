angular.module('MyConfServiceModule',[]).factory('MyConfService',['$http',function($http){

    return {
        View: function (x1) {
            return $http.get("/conf/showconf/chair/:confId",
                {
                    confId: x1
                });
        }

    }
}]);