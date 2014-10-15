var express = require('express');
var app = module.exports = express();
var path = require('path');
var http = require('http');
var routes = require('./routes/routes');
var path = require('path');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(path.join(__dirname + '/properties/config.properties'));

var passport = require('passport'), 
	authentication = require('./routes/authentication');

// to render html 
app.set('views', path.join(__dirname + '/../client/public/views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: properties.get("app.secret") }));
app.use(express.methodOverride());

// setup passport authentication - before routes, after express session
app.use(passport.initialize());
app.use(passport.session());
passport.use(authentication.localStrategy);
passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser);


app.use(express.static(path.join(__dirname, '/../client/public')));

//API ROUTES
app.get('/api/hello', routes.hello);
app.get('/api/properties', routes.properties);
app.post('/api/register', routes.registerUser)

// ===== INSERT INITIAL TEST DATA ====== \\
// 
// app.get('/api/insert/hello', routes.insertHello);


//CLIENT ROUTES

app.use(express.static(path.join(__dirname, '/client/public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/logout', authentication.logout);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

http.createServer(app).listen(properties.get("app.port"), function () {
  console.log('Express server listening on port ' + properties.get("app.port"));
});