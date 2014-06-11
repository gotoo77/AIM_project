//******************************************************************************
//		AIM server (test)
//******************************************************************************

// Declare all modules used
var express = require('express'),
    path = require('path'),
    http = require('http'),
	//wine = require('./routes/wines'); // original base using mongoDB
    wine = require('./routes/wines_sql'),
	file = require('./routes/files');
	//aim_util = require('./routes/AIM_util');

	//var connect = require('connect');

var fs = require('fs');

// Declare variables
var AIM_Port = 3000;
var AIM_Version ='0.1.0';	

// polyglot object for multi langage handling
//var i18n = require('node-polyglot');


var app = express();

/*app.use(express.cookieParser());
app.use(express.cookieSession());

app.use(i18n());
app.locals(i18n.locals);*/

var logFile = fs.createWriteStream('./myLogFile.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode



//var polyglot = new Polyglot();

// Configuration of app
app.configure(function () {
    app.set('port', process.env.PORT || AIM_Port);
	app.set('version', AIM_Version);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.logger({stream: logFile}));
//app.use(express.logger({ immediate: true, format: 'dev' });
	//express.logger({ immediate: true, format: 'dev' })
    //app.use(express.bodyParser()), // cf : http://stackoverflow.com/questions/19581146/how-to-get-rid-of-connect-3-0-deprecation-alert
	app.use(express.json());
	app.use(express.urlencoded());
    app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'files')));
	//app.use(connect.favicon());
	//app.use(express.favicon("public/favicon.ico")); 
	
	//app.use(connect.favicon('christophe.png'))
});

// Functions to execute when 'CRUD' method received ( REST architecture)
app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

// On execute la requete SQL 
app.get('/download', file.download);
app.get('/pdf', file.createPDF);


// Running HTTP server on configured port
http.createServer(app).listen(app.get('port'), function () {
	console.log("*********************************************************");
    console.log("AIM - Node.js server listening on port " + app.get('port'));
	console.log("Version is :"+app.get('version') + " (Powered by Express)");
	console.log("*********************************************************");
});
