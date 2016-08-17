angular.module('appRoutes',['ui.router']).config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
    console.log("approutes");
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('/', {
            url: "/",
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .state('register', {
            url: "/register",
            templateUrl: 'views/register.html',
            controller: 'UserController'
        })
        .state('home', {
            url: "/home",
            templateUrl: 'views/home.html',
            controller: 'HomeController',
            abstract:true,
            resolve:{
                logincheck: checkLoggedin
            }
        })
        .state('home.requestForPrivilege', {
            url: "/request",
            templateUrl: 'views/requestprivilege.html',
            controller: 'PreReqController',
            resolve:{
                logincheck: checkLoggedin
            }
        })
        .state('home.editUser', {
            url: "/editUser",
            templateUrl: 'views/UserProfile.html',
            controller: 'editUserController',
            resolve:{
                logincheck: checkLoggedin
            }
    })
        .state('home.welcome', {
            url: "/",
            templateUrl: 'views/welcome_nested.html'
        });
    //$locationProvider.html5Mode(true);
}]);

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    if(!$rootScope.user){
    var deferred = $q.defer();
        $http.get('/users/loggedin').success(function(user) {

            if (user !== '0') {
                //we got data from session object now evrything is guuuuttttt//
                console.log("authenticated");
                $rootScope.authenticated=true;
                $rootScope.user = user;
                deferred.resolve();
            } else { //User is not Authenticated
                console.log("not authenticated");
                $rootScope.authenticated=false;
                deferred.reject();
                $location.url('/login');
            }
        });
    return deferred.promise;
    }
};