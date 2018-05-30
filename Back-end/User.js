var db = require('./database');
var auth = require('./authentication');

//this function is responsible for adding a new user
exports.add = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		//TODO: server validation
		
		//if no error prepare our user object with the values sent by the client
		var user = {
		  username: req.body['username'],
		  password: req.body['password'],
		  nationality: req.body['nationality'],
		  email: req.body['email'],
		};
		console.log(req.body);
		//perform the query
		data.query('INSERT INTO Users SET ?', user, function (err, result) {
			//return control to the calling module
			callback(err, user);
		});
	});
};

exports.login = function (conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			var data;
			
			if(result.login === "success"){
				data = {value:1, message:"login success"};	
			}
			else{
				data = {value:0, message:"username or password is incorrect"};
				
			}
			callback(null, data);
			
		});		
		
	});
	
};

exports.getAll = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				//perform the query
				data.query('SELECT * FROM Users', function (err, result) {
					//return control to the calling module
					
					let data = JSON.stringify(result);
					
					callback(err, data);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});		
		
	});
};

exports.getById = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				let id = req.params.id;
				
				//perform the query
				data.query('SELECT * FROM Users WHERE id = ' + id , function (err, result) {
					//return control to the calling module
					
					let data = JSON.stringify(result);
					
					callback(err, data);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});				
		
	});
};

exports.deleteById = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				let id = req.params.id;
				
				//perform the query
				data.query('DELETE FROM Users WHERE id = ' + id , function (err, result) {
					//return control to the calling module
					
					let data = JSON.stringify(result);
					
					callback(err, data);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});				
		
	});
};

exports.updateById = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				let id = req.params.id;
				
				//if no error prepare our user object with the values sent by the client
				var user = {
				  username: req.body['username'],
				  password: req.body['password'],
				  nationality: req.body['nationality'],
				  email: req.body['email']
				};
				//perform the query
				data.query('UPDATE Users SET ? WHERE id = ' + req.params.id, user, function (err, result) {
					//return control to the calling module
					callback(err, user);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(JSON.stringify(err));
			}
			
		});		
		
	});
};