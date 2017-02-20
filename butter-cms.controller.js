var lame = require('./lame');
var butter = require('buttercms')(lame.APIkey);


var contentFields = ['image_carousel','home_page_banner','home_sections',
'about_page_images','about_page_banner', 'about_page_sections', 'board_of_directors', 'executive_director',
'services', 'events_banner_image','events', 'wishlist', 'vol_positions'];

module.exports = {

  getContent: (req, res) => {
    butter.content.retrieve(contentFields)
      .then(function(resp) {
        //console.log(resp.data)
        res.send(resp.data);
      }).catch(function(resp) {
        console.log(resp)
      });
    }
}
