var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	console.log('======================================');
	console.log('success !');
	console.log('======================================');
	res.sendFile('./public/index.html');
});


router.get('/error', function (req, res, next) {
	console.log('======================================');
	console.log('render the error page');
	console.log('======================================');
	res.sendFile('./public/error.html');
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
