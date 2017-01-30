angular.module('awp')
  .controller('mainController', mainController);

mainController.$inject = ['$http'];

function mainController($http) {
  var main = this;

  // Request to back-end that makes call to CMS
  $http.get('/cmsdata')
    .then(function(res){

      // Main object of CMS response
      main.awp = res.data.data;
      // Data used in bootstrap carousel
      main.image_carousel = res.data.data.image_carousel;
      // In order to split the 'services section' into two columns on the page
      //we need to split it evenly into two different arrays
      main.rightServices = res.data.data.services.slice(Math.ceil(res.data.data.services.length/2));
      main.leftServices = res.data.data.services.splice(0, Math.ceil(res.data.data.services.length/2));
      // Images on the about page
      main.aboutImages = res.data.data.about_page_images;
      // Save events info into array
      main.events = res.data.data.events;
      // Split wishlist into two columns
      main.rightWishlist = res.data.data.wishlist.slice(Math.ceil(res.data.data.wishlist.length/2));
      main.leftWishlist = res.data.data.wishlist.splice(0, Math.ceil(res.data.data.wishlist.length/2));
      // Split positions into two columns
      main.rightPositions = res.data.data.vol_positions.slice(Math.ceil(res.data.data.vol_positions.length/2));
      main.leftPositions = res.data.data.vol_positions.splice(0, Math.ceil(res.data.data.vol_positions.length/2));


    }, function(err){
      if (err){
        console.error(err);
      }
    })


//////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////  VOLUNTEER APPLICATION  ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////

  // Blank object to store volunteer information for application
  main.volData = {};
  main.formPage = 1;

  main.othInt = 'here';

/////////////////////////////  WORK AND VOL EXP PAGE CODE  ///////////////////////////////////////////

  // Initialize Variables
  main.moreWork = 0;
  main.moreVol = 0;

  // One work object is hardcoded into the array so it shows the user the inputs for one work experience
  main.volData.work = [{
    name: '',
    dateFrom: '',
    dateTo: '',
    description: '',
    pos: 0,
  }]

  // Same for this one except for volunteer experience
  main.volData.vol = [{
    name: '',
    dateFrom: '',
    dateTo: '',
    description: '',
  }]

  // Function for when the user add more than one work experience
  main.addMoreWork = function() {
    // This IF statement limits the amount of work experience the user can add to three
    if (main.moreWork < 2){

      main.volData.work.push({
      name: '',
      dateFrom: '',
      dateTo: '',
      description: '',
    })

    main.moreWork++;
    }
  }

  main.removeWork = function($event){
    var workToDelete = $event.currentTarget.getAttribute('id')
    console.log(main.volData.work);
    console.log(workToDelete);

        if(main.volData.work.length > 1){
          main.volData.work.splice(workToDelete, 1);
          main.moreWork--;
        }
    }


  main.addMoreVol = function() {
    // This IF statement limits the amount of work experience the user can add to three
    if (main.moreVol < 2){
      main.moreVol++;

      main.volData.vol.push({
      name: '',
      dateFrom: '',
      dateTo: '',
      description: ''
    })
    }
  }

  main.removeVol = function($event){
    var volToDelete = $event.currentTarget.getAttribute('id')
    console.log(main.volData.vol);
    console.log(volToDelete);

        if(main.volData.vol.length > 1){
          main.volData.vol.splice(volToDelete, 1);
          main.moreVol--;
        }
    }

  main.nextBtn = function(){
        main.formPage++;

  }

  main.prevBtn = function(){
    main.formPage--;
//     console.log(main.volData);
  }

}
