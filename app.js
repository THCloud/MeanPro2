var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var route = require('./app/routes/route.js');
// var api = require('./app/routes/api.js');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
	
app.use(route);
// app.use('/api/', api);

app.get('*', function(req, res) {
		console.log('haha, here!');
		res.sendFile(path.join(__dirname, 'public', 'layout.html'));
	})
	.listen(3000);
// app.listen(3000);
console.log('Express server listening on port 3000');	
