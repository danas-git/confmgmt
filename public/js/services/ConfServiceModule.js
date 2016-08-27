angular.module('ConfServiceModule',[]).factory('ConfService',['$http',function($http){


    return {
       /* FetchChairPersons: function () {
            return $http.get("/priv/getChair",
                {});
        },*/
        CreateConference: function (object) {
            return $http.post("/conf/createConf", object
            );
        },

        ListConference: function () {
            return $http.get("/conf/allconferences",
                {});

        },
        Join: function (userId, confId) {
            return $http.post("/conf/allconferences/join",
                {
                    userId: userId,
                    confId: confId
                });
        }
    }
}]);