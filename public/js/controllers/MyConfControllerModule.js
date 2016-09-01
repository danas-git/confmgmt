angular.module('MyConfControllerModule',[]).controller('MyConfController',function($scope,MyConfService,$location,$state,$rootScope,$stateParams){
    console.log("MyConfController");
    $scope.authors=[];
    $scope.reviewerId="";
    $scope.currentConferenceId = $stateParams.confId;
    console.log($scope.currentConferenceId);

    MyConfService.fetchConferenceData($scope.currentConferenceId).then(function(conf){
        $scope.bigData=conf.data;
        console.log($scope.bigData);
    });

    $scope.subDate = function(data) {
       console.log(data);
    };
    $scope.revDate = function(data) {
        console.log(data);
    };

    MyConfService.getAuthors($scope.currentConferenceId).then(function(object){
        angular.forEach(object.data,function(type,index){
            angular.forEach(type.conferenceSubmissions,function(value,index){
                if(value.submittedBy!=null){
                    $scope.authors.push(value.submittedBy)}
            })
        });
        console.log($scope.authors)
    });

    $scope.reviewerFilter = function(auth,email) {
        return (auth!= email );
    };

    $scope.assign= function(reviewer,subId){
        //is to get Id associated with author email.
        angular.forEach($scope.authors,function(author,index){
            if(author.email==reviewer){
                console.log(author);
                $scope.reviewerId=author._id;
                console.log($scope.reviewerId);
                console.log("Success");
                }
        });
        if($scope.reviewerId!=""){
        MyConfService.addReviewer($scope.currentConferenceId,subId,$scope.reviewerId).then(function(object){
            console.log(object);
            $scope.bigData=object.data;
        });
        }
    };

    $scope.getId= function(obj){
        //console.log( obj);
    }

});