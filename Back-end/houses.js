var db = require('./database');
var auth = require('./authentication');

//this function is responsible for adding a new house
exports.add = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		//TODO: server validation
		
		//if no error prepare our house object with the values sent by the client
		var house = {
		  name: req.body['name'],
		  address: req.body['address'],
		  createdDate: req.body['createdDate'],
		  photo: req.body['photo'],
		};
		console.log(req.body);
		//perform the query
		data.query('INSERT INTO Houses SET ?', house, function (err, result) {
			//return control to the calling module
			callback(err, house);
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
		data.query('SELECT * FROM Houses', function (err, result) {
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
		data.query('SELECT * FROM Houses WHERE id = ' + req.params.id , function (err, result) {
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
				data.query('DELETE FROM Houses WHERE id = ' + req.params.id , function (err, result) {
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
				
				//if no error prepare our house object with the values sent by the client
				var house = {
					name: req.body['name'],
					address: req.body['address'],
					createdDate: req.body['createdDate'],
					photo: req.body['photo'] 
				};
				console.log(house);
				console.log(req.params.id);
				//perform the query
				data.query('UPDATE Houses SET ? WHERE id = ' + req.params.id, house, function (err, result) {
					//return control to the calling module
					callback(err, house);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});		
	
		
	});
};