var mongoose = require('mongoose');
var q = require('q');
var path = require('path');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader(path.join(__dirname + '/../properties/config.properties'));

mongoose.connect('mongodb://' 
	+ properties.get("db.host") 
	+ ':' + properties.get("db.port") 
	+ '/' + properties.get("db.databasename"));

var db = mongoose.connection;
db.on('error', function()
{
    console.log('Error Connecting to the MongoDB');
});
db.on('connected', function() 
{
    console.log("Connection to MongoDB was Successful");
});

var TestDataSchema = mongoose.Schema({message:String});
var TestData = mongoose.model('TestData', TestDataSchema);

exports.hello = function()
{
	var deferred = q.defer();
	TestData.find({}, function(err, data)
	{
		if (!!err)
		{
			deferred.reject(err);
		}
		deferred.resolve(data);
	})
	return deferred.promise;
}

exports.properties = function()
{
	var deferred = q.defer();
	deferred.resolve(properties);
	return deferred.promise;
}

exports.test = function()
{
	return "HELLO";
}

// ===== INSERT INITIAL TEST DATA ====== \\
// 
// exports.insertHello = function()
// {
// 	var deferred = q.defer();
// 	var td = new TestData(
// 	{
// 		message : "Test Passed"
// 	});
// 	td.save(function(err, data)
// 	{
// 		if (!!err)
// 		{
// 			deferred.reject(err);
// 		}
// 		deferred.resolve(data);
// 	});

// 	return deferred.promise;
// }