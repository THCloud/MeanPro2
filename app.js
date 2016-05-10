var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var route = require('./app/routes/route.js');
var admin = require('./app/routes/admin.js');
var task = require('./app/routes/task.js');
var tag = require('./app/routes/tag.js');
var login = require('./app/routes/login.js');


var mongoose = require('mongoose');
var session = require('express-session');
var sessionConf = require('./config/session-config.js');
var db = require('./config/db-config.js');

mongoose.connect(db.url);
mongoose.connection;


var app = express();

// for session.
app.use(session(sessionConf));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
	
app.use(route);
app.use('/login', login);
app.use('/task', task);
app.use('/tag', tag);
app.use('/admin', admin);

app.get('*', function(req, res) {
		res.sendFile(path.join(__dirname, 'public', 'layout.html'));
	})
	.listen(3000);
console.log('Express server listening on port 3000');	

