angular.module('MyConfServiceModule',[]).factory('MyConfService',['$http',function($http){

    return {
        fetchConferenceData: function (id) {
            return $http.get("/conf/showconf/chair",{params: {confId:id}}
               );
        },
        getAuthors: function (id) {
            return $http.get("/editConf/getAuthors",{params:{confId:id}}
            );
        },

        addReviewer: function(confId,subId,reviewerId){
            return $http.post('/editConf/assignReviewer',
                {
                    confId:confId,
                    subId:subId,
                    reviewerId:reviewerId
                });
        }
    };
}]);