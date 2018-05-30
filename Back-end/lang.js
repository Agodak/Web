var http = require('http');
var url = require('url');
var fs = require('fs');
http.createServer(function (req, res) {
	var q = url.parse(req.url, true).query;
	lang = 'en';
	if(q.lang == 'fr')
		lang = 'fr'
	fs.readFile('home_' + lang + '.html', function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
}).listen(8080);