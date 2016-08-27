angular.module('SubmissionServiceModule',[]).factory('submissionService',['$http',function($http,$rootScope){
    console.log("submissionservice");
    return {
        uploadinfo: function(conference,user,submission){
            return $http.post("/submission/uploadinfo",{
                conference: conference,
                user:user,
                submission: submission
            });
        },
        getoldinfo: function(conference,user){
            console.log("getoldinfo");
            console.log(conference.submissionEndDate);
            var newdate = new Date(conference.submissionEndDate);
            console.log(newdate);
            return $http.post("/submission/getoldinfo",{
                conference: conference,
                user:user
            });
        }
    }
}]);