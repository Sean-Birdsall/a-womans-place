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
    .otherwise({
      redirectTo: '/'
    })
  
}