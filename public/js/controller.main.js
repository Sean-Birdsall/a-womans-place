angular.module('awp')
  .controller('mainController', mainController);

mainController.$inject = ['$http', '$location'];

function mainController($http, $location) {
  var main = this;

  // Figures out which page user is on when they enter the site and selects the
  // correct navigation link
  main.activeNav;
  switch ($location.$$absUrl.slice(17)){
    case '#/':
      main.activeNav = 1;
      break;
    case '#/about':
      main.activeNav = 2;
      break;
    case '#/getHelp':
      main.activeNav = 3;
      break;
    case '#/dv':
      main.activeNav = 4;
      break;
    case '#/giveHelp':
    case '#/volunteer':
    case '#/volunteerApp':
    case '#/wishlist':
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
  main.volData = {};

  // Dummy Form Data
  // main.volData = { "workExp":"Seven years in the Navy",
  //                   "volExp":"Animal shelter volunteer work",
  //                   "references":[{
  //                     "name":"Donald Trump",
  //                     "relationship":"President",
  //                     "phone":"555-555-5555"
  //                     },{
  //                     "name":"Obama",
  //                     "relationship":"Former President",
  //                     "phone":"555-555-2342"
  //                   }],
  //                   "length":"Ongoing",
  //                   "hours":"10",
  //                   "why":"I want to help a cause I believe in",
  //                   "like":"The rewarding feeling of helping people",
  //                   "how":"RefactorU career services",
  //                   "first":"Sean",
  //                   "last":"Birdsall",
  //                   "street":"1216 Marina Ct.",
  //                   "city":"Lewisivlle",
  //                   "state":"TX",
  //                   "zip":75067,
  //                   "phone":"972-510-9534",
  //                   "email":"sbirdsall0312@gmail.com",
  //                   "highestEd":"Some College",
  //                   "major":"N/A",
  //                   "languages":['English'],
  //                   "times":['Afternoons'],
  //                   "contactMethods":['Phone','Email'],
  //                   "eduExpected":null,
  //                   "days":['Saturday','Sunday'],
  //                   "volTimes":['Mornings','Afternoons'],
  //                   "crime":"No",
  //                   "questions":"None",
  //                   "restrictions":"None",
  //                   "emc":{
  //                     "name":"Debbie Birdsall",
  //                     "relationship":"Mother",
  //                     "street":"1216 Marina Ct.",
  //                     "city":"Lewisivlle",
  //                     "state":"TX","zip":75067,
  //                     "phone":"214-641-8295"},
  //                     };

  main.formPage = 1;

  main.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  main.times = ['Mornings', 'Afternoons', 'Evenings'];

  main.contactMehtods = ['Phone', 'Email'];

  main.languages = ['English', 'Spanish', 'Other...'];

  main.formStates = ["CO","AL","AK","AZ","AR","CA","CT","DE","DC","FL","GA","HI",
                     "ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN",
                     "MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH",
                     "OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA",
                     "WV","WI","WY"];

  main.nextBtn = function(){
        main.formPage++;
  }

  main.prevBtn = function(){
    main.formPage--;
  }

}
