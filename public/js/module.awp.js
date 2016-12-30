angular.module('awp', ['ngRoute'])
  .config(myRouter);

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider){
  
  $routeProvider
    .when('/', {
      templateUrl: '../templates/home.html'
    })
    .when('/about', {
      templateUrl: '../templates/about.html'
    })
    .when('/services', {
      templateUrl: '../templates/services.html'      
    })
    .when('/getHelp', {
      templateUrl: '../templates/getHelp.html'
    })
    .when('/giveHelp', {
      templateUrl: '../templates/giveHelp.html'
    })
    .when('/dv', {
      templateUrl: '../templates/dv.html'
    })
    .when('/volunteer', {
      templateUrl: '../templates/volunteer.html'
    })
    .otherwise({
      redirectTo: '/'
    })
  
}