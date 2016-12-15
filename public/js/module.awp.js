angular.module('awp', ['ngRoute'])
  .config(myRouter);

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider){
  
  $routeProvider
    .when('/', {
      templateUrl: '../templates/home.html'
    })
    .otherwise({
      redirectTo: '/'
    })
  
}