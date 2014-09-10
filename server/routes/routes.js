var Users = require('../local_modules/users');


//====== CLIENT ROUTES ======= \\
exports.index = function(req, res){
  res.render('index');
};
 
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

//====== API ROUTES ======= \\
exports.hello = function(req, res)
{
	Users.hello()
	.then(function(data)
	{
		return res.send(200, data);
	})
	.catch(function(err)
	{
		return res.send(400, err);
	});
}

exports.properties = function(req, res)
{
	Users.properties()
	.then(function(data)
	{
		return res.send(200, data);
	})
	.catch(function(err)
	{
		return res.send(400, err);
	});
}


// ===== INSERT INITIAL TEST DATA ====== \\
// 
// exports.insertHello = function(req, res)
// {
// 	Users.insertHello()
// 	.then(function(data)
// 	{
// 		return res.send(200, data);
// 	})
// 	.catch(function(err)
// 	{
// 		return res.send(400, err);
// 	});
// }

