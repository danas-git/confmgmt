angular.module('PreReqServiceModule',[]).factory('PreReqService',['$http',function ($http) {

    console.log("PreReqService");

    return {

        Submit : function(comments,id){
            return $http.post("/priv/request",
                {
                    comments: comments,
                    userid  : id
                });
        }
    }
}]);
