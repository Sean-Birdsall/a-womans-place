angular.module('awp')
  .controller('mainController', mainController);

mainController.$inject = ['$http', '$location'];

function mainController($http, $location) {
  var main = this;

  // Figures out which page user is on when they enter the site and selects the
  // correct navigation link
  main.activeNav;
  switch ($location.$$absUrl.slice(22)){
    case '#/':
      main.activeNav = 1;
      break;
    case '#/about':
      main.activeNav = 2;
      break;
    case '#/services':
      main.activeNav = 3;
      break;
    case '#/getHelp':
      main.activeNav = 4;
      break;
    case '#/giveHelp':
      main.activeNav = 5;
      break;
    default:
      main.activeNav = 1;
  }


  // Value used to dynamically set height of YouTube video and adjacent divs on home page
  main.ytHeight = $(window).height() / 3;

  // Request to back-end that makes call to CMS
  $http.get('/cmsdata')
    .then(function(res){

      // Main object of CMS response
      main.awp = res.data.data;
      // Data used in bootstrap carousel
      main.image_carousel = res.data.data.image_carousel;

      main.homeSections = res.data.data.home_sections;
      main.aboutSections = res.data.data.about_page_sections;
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
  main.volData = { "work":[{
                      "name":"Work One",
                      "dateFrom":"2007-09-20T06:00:00.000Z",
                      "dateTo":"2014-12-01T07:00:00.000Z",
                      "description":"Working at workplace one."
                      ,"pos":0}],
                    "vol":[{
                      "name":"",
                      "dateFrom":null,
                      "dateTo":null,
                      "description":""}],
                    "references":[{
                      "name":"Donald Trump",
                      "relationship":"President",
                      "phone":"555-555-5555"
                      },{
                      "name":"Obama",
                      "relationship":"Ex-President",
                      "phone":"555-555-2342"
                    }],
                    "first":"Sean",
                    "middle":"Paul",
                    "last":"Birdsall",
                    "street":"1216 Marina Ct.",
                    "city":"Lewisivlle",
                    "state":"TX",
                    "zip":75067,
                    "phone":"972-510-9534",
                    "email":"sbirdsall0312@gmail.com",
                    "contact":{"email":true},
                    "time":{"afternoon":true},
                    "highestEd":"Some College",
                    "major":"N/A","internship":
                    "Yes","language":{"english":true},
                    "eduExpected":null,
                    "emc":{
                      "name":"Debbie Birdsall",
                      "relationship":"Mother",
                      "street":"1216 Marina Ct.",
                      "city":"Lewisivlle",
                      "state":"TX","zip":75067,
                      "phone":"214-641-8295"},
                      "interest":[],
                      "crime":"no"};
  main.formPage = 8;

  main.formStates = ["CO","AL","AK","AZ","AR","CA","CT","DE","DC","FL","GA","HI",
                     "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN",
                     "MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH",
                     "OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
                     "WV","WI","WY"];

  main.othInt = 'here';

/////////////////////////////  WORK AND VOL EXP PAGE CODE  ///////////////////////////////////////////

  // Initialize Variables
  main.moreWork = 0;
  main.moreVol = 0;
  // main.volData.references = [];

  function Reference(name, relationship, phone){
    this.name = name,
    this.relationship = relationship,
    this.phone = phone;
  }

  main.saveRefs = function(){
    main.volData.references.push(new Reference(main.refOneName, main.refOneRelationship,
      main.refOnePhone));
      main.volData.references.push(new Reference(main.refTwoName, main.refTwoRelationship,
        main.refTwoPhone));
  }

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
