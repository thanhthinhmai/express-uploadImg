const fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});
gm('./uploads/star_wars_episode_5_hero.jpg')
.font("Helvetica.ttf", 150)
.drawText(120, 350, "10000000")
// .label('1')
.write('./b.jpg', function (err) {
  if (!err) console.log('done');
});

exports.modules = gm;