var express = require('express');
var router = express.Router();
var path = require('path');
// var bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));


router.get('/main', function (req, res, next) {
	console.log('I send the main.html to the FE');	
});


router.get('/error', function (req, res, next) {
	console.log('======================================');
	console.log('render the error page');
	console.log('======================================');
});

router.post('/error', function (req, res, next) {
	console.log('======================================');
	console.log('get an ajax from browser');
	console.log(req.body);
	console.log('======================================');
	var data = { state: 'success' };
	res.send(data);
});



module.exports = router;