const CaptureController = require('../Controllers/CaptureController');

module.exports = function(router){
  // router.post('/api/capture/convertWebmToMP4',multer.single('logo_path'), CaptureController.convertWebmToMP4);

  router.post('/search-api/user', CaptureController.userUpdate);
  router.post('/search-api/user-whereabouts', CaptureController.userWhereaboutsUpdate);
}
