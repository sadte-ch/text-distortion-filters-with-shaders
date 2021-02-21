const express = require('express');
const router = express.Router();
const routes = require('./routes');

router.get('/', function(req,res) { res.json(`You should not be here!`)});
// use middlewear to check for valid incoming request
// use the router to craete ther otues from the function
routes(router);
module.exports = router;
