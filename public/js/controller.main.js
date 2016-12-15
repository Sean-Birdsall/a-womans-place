angular.module('awp')
  .controller('mainController', mainController);

function mainController() {
  var main = this;
  main.greeting = "Hello World";
  
}