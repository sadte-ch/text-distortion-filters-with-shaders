const CaptureController = require('../Controllers/CaptureController');

const Multer = require('multer');
const multer = Multer({
    storage: Multer.memoryStorage(),
});

module.exports = function(router){
  router.post('/api/capture/convertWebmToMP4',multer.single('logo_path'), CaptureController.convertWebmToMP4);
}
