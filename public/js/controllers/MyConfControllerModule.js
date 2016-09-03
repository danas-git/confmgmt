angular.module('MyConfControllerModule',[]).controller('MyConfController',function($scope,MyConfService,$location,$state,$rootScope,$stateParams){
    console.log("MyConfController");
    $scope.authors=[];
    $scope.reviewerId="";
    $scope.Status="";
    $scope.messageSubDate="";
    $scope.messageReviewDate="";
    $scope.currentConferenceId = $stateParams.confId;
    console.log($scope.currentConferenceId);

    MyConfService.fetchConferenceData($scope.currentConferenceId).then(function(conf){
        $scope.bigData=conf.data;
        console.log($scope.bigData);
        $scope.setStatus();
    });

    $scope.setStatus = function(){
        angular.forEach($scope.bigData,function(type,index){
            $scope.reviewDate=type.reviewEndDate;
            $scope.submissionDate=type.submissionEndDate;
        });
        var date = new Date();
        var presentDate = date.toJSON();
        if(presentDate<$scope.submissionDate){$scope.Status="Submission Stage";}
        else if(presentDate>$scope.submissionDate && presentDate<$scope.reviewDate){$scope.Status="Review Stage";}
        else if(presentDate>$scope.reviewDate){$scope.Status="Ended";}
    };

    $scope.closeSubmission = function(){
        MyConfService.closeSubmission($scope.currentConferenceId).then(function(object){
            console.log("submission closed");
            $state.go($state.current, {}, {reload: true});
        })
    };
    $scope.closeReview = function(){
        console.log("hit");
        MyConfService.closeReview($scope.currentConferenceId).then(function(object){
            $state.go($state.current, {}, {reload: true});
        })
    };

    $scope.subDate = function(data) {
        var date = new Date();
        var presentDate = date.toJSON();
        if(data < presentDate){$scope.messageSubDate="Submission end date can not be set to past";}
        else if(data > $scope.reviewDate){$scope.messageSubDate="Submission end date must fall before review end date";}
        else if(data>presentDate && data<$scope.reviewDate) {
            $scope.messageSubDate = "";
            ///call backend set date service
            MyConfService.updateSubmissionDate(data,$scope.currentConferenceId).then(function (Object) {
                $state.go($state.current, {}, {reload: true});
            })
        }
    };
    $scope.revDate = function(data) {
        var date = new Date();
        var presentDate = date.toJSON();
        if(data < presentDate){$scope.messageReviewDate="Review end date can not be set to past";}
        else if(data < $scope.submissionDate){$scope.messageReviewDate="Review end date must fall after submission end date";}
        else if(data>presentDate && data>$scope.submissionDate){$scope.messageReviewDate="";
            ///call backend set date service
            MyConfService.updateReviewDate(data,$scope.currentConferenceId).then(function (Object) {
                $state.go($state.current, {}, {reload: true});
            })
        }
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
            $scope.setStatus();
        });
        }
    };

});