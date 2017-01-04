angular.module('awp')
  .controller('mainController', mainController);

function mainController() {
  var main = this;
  
  main.volData = {};
  
  main.formPage = 1;
  
  main.nextBtn = function(){
    main.formPage++;
    console.log(main.volData);
  }
  
  main.prevBtn = function(){
    main.formPage--;
    console.log(main.volData);
  }
  
}
