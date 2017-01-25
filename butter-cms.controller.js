var lame = require('./lame');
var butter = require('buttercms')(lame.APIkey);


var contentFields = ['image_carousel','home_page_banner','services',
'about_page_images','mission', 'philosophy', 'history','events_banner_image',
'events', 'wishlist', 'vol_positions'];

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
