var db = require('./database');
var auth = require('./authentication');

exports.add = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//TODO: server validation
		
		//if no error prepare our favourites object with the values sent by the client
		var favourites = {
		  name: req.body['name'],
		  username: req.body['username'],
		  favouriteDate: req.body['favouriteDate'],
		  photo: req.body['photo'] 
		};
		//perform the query
		data.query('INSERT INTO Favourites SET ?', favourites, function (err, result) {
			//return control to the calling module
			callback(err, favourites);
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
				
		//perform the query
		data.query('SELECT * FROM Favourites', function (err, result) {
			//return control to the calling module
			
			let data = JSON.stringify(result);
			
			callback(err, data);
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
		
		//perform the query
		data.query('SELECT * FROM Favourites WHERE id = ' + req.params.id , function (err, result) {
			//return control to the calling module
			
			let data = JSON.stringify(result);
			
			callback(err, data);
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
				
				//perform the query
				data.query('DELETE FROM Favourites WHERE id = ' + req.params.id , function (err, result) {
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
				
				//if no error prepare our favourites object with the values sent by the client
				var favourites = {
					name: req.body['name'],
					username: req.body['username'],
					favouriteDate: req.body['favouriteDate'],
					photo: req.body['photo'] 
				};
				//perform the query
				data.query('UPDATE Favourites SET ? WHERE id = ' + req.params.id, favourites, function (err, result) {
					//return control to the calling module
					callback(err, favourites);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});		
	
		
	});
};