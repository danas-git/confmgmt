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
            abstract:true
        })
        .state('home.welcome', {
            url: "/",
            templateUrl: 'views/welcome_nested.html'
        });
    $locationProvider.html5Mode(true);
}]);