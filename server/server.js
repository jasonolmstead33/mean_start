var express = require('express');
var app = module.exports = express();
var path = require('path');
var http = require('http');
var routes = require('./routes/routes');
var path = require('path');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(path.join(__dirname + '/properties/config.properties'));

// to render html 
app.set('views', path.join(__dirname + '/../client/public/views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(express.logger('dev'));
app.use(express.bodyParser());


app.use(express.static(path.join(__dirname, '/../client/public')));

//API ROUTES
app.get('/api/hello', routes.hello);
app.get('/api/properties', routes.properties);

// ===== INSERT INITIAL TEST DATA ====== \\
// 
// app.get('/api/insert/hello', routes.insertHello);


//CLIENT ROUTES

app.use(express.static(path.join(__dirname, '/client/public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.index);

http.createServer(app).listen(properties.get("app.port"), function () {
  console.log('Express server listening on port ' + app.get('port'));
});