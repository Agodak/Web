//import restify module
var restify = require('restify');
//import our user module which handles all CRUD operations on users
var user = require('./user');
//import our database module which handles most of general db operations
var db = require('./database');
var auth = require('./authentication');
var house = require('./houses');
var favourites = require('./favourites');

const corsMiddleware = require('restify-cors-middleware')

//add 'Authorization' to allowHeader to tell preflight browser OPTION request that basic auth is allowed
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:3000'],
  credentials: true,
  allowHeaders: ['API-Token', 'Authorization'],
  exposeHeaders: ['API-Token-Expiry'],

})

//create the restify module
const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)

//initialise the server with required plugins
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())

//prepare our database connection parameters
const databaseData = {
	host:"sql2.freemysqlhosting.net",
	user:"sql2210815",
	password: "dR4!yZ5*",
	database: "sql2210815"
};
//save server port on global variable
var port = 8080;

//route any requests to http://localhost:8080/user/add to this function
server.post('/user/add', (req, res) => {
	//we are attempting to add a user
	user.add(databaseData, req, function (err, data){
		//when adding a user is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
		res.status(201);
		res.end("success");
	});
})

server.get('/user/getAll', (req, res) => {
	
	user.getAll(databaseData, req, function (err, data){
	
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end(data);
	});
})

server.get('/user/:id', (req, res) => {

	
	//we are atempting to retrieve one user
	//note that we get the user id through the req.params.id, id matches the path parameter name 
	user.getById(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.del('/user/:id',(req, res) => {
	
	user.deleteById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(201);
		res.end(data);
	});

});

server.put('/user/:id', (req, res) => {
	
	//we are atempting to update a user
	user.updateById(databaseData, req, function (err, data){
		

		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end("success");
	});
})

server.post('/user/login', (req, res) => {
	
	//we are atempting to add a user
	user.login(databaseData, req, function (err, data){
		
		//when adding a user is done, this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			//set status bad request
			res.status(400);
			res.end(JSON.stringify(err));
			return;
		}
		//if no error let's set proper response code and have a party
		if(data.value == 1){
			//set status OK
			res.status(200);
		}
		else{
			//set status unauthorised
			res.status(401);
		}
		
		res.end(JSON.stringify(data));
		
	});
})

server.post('/house/add', (req, res) => {
	//we are attempting to add a house
	house.add(databaseData, req, function (err, data){
		//when adding a house is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
		res.status(201);
		res.end("success");
	});
})

server.get('/house/getAll', (req, res) => {
	
	house.getAll(databaseData, req, function (err, data){
	
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end(data);
	});
})

server.get('/house/:id', (req, res) => {

	
	//we are atempting to retrieve one house
	//note that we get the house id through the req.params.id, id matches the path parameter name 
	house.getById(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.del('/house/:id',(req, res) => {
	
	house.deleteById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(201);
		res.end(data);
	});

});

server.put('/house/:id', (req, res) => {
	
	//we are atempting to update a house
	house.updateById(databaseData, req, function (err, data){
		

		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end("success");
	});
})

server.post('/favourites/add', (req, res) => {
	//we are attempting to add a favourite house
	favourites.add(databaseData, req, function (err, data){
		//when adding a favourite house is done this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
		}
		//if no error let's set proper response code and have a party
		res.status(201);
		res.end("success");
	});
})

server.get('/favourites/getAll', (req, res) => {
	
	favourites.getAll(databaseData, req, function (err, data){
	
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end(data);
	});
})

server.get('/favourites/:id', (req, res) => {

	
	//we are atempting to retrieve one favourite house
	//note that we get the favourite house id through the req.params.id, id matches the path parameter name 
	favourites.getById(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.del('/favourites/:id',(req, res) => {
	
	favourites.deleteById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(201);
		res.end(data);
	});

});

server.put('/favourites/:id', (req, res) => {
	
	//we are atempting to update a favourite house
	favourites.updateById(databaseData, req, function (err, data){
		

		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end("success");
	});
})

//this route will allow to create tables in the database
//it should be a confidential method and can be performed only by an admin
server.get('/createTables', (req, res) => {
	
	db.createTables(databaseData, function(err, state){
		if(err) {
			res.status(400);
			res.end("an error has occured:" + err);
			return;
		}
		res.status(200);
		res.end("tables were created successfully");
	});
})

//start the server
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`)
	}
})
