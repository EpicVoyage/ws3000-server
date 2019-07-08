let ws3000 = require('ambientweather-ws3000');
let http = require('http');
let url = require('url');

let sensors = null;

let ws3000_update = async function() {
	sensors = await ws3000.query();
};

setInterval(ws3000_update, 60000);
ws3000_update();

http.createServer(function (request, response) {
	// request.addListener('end', function () {
	try {
		let pathName = url.parse(request.url).pathname;
		let parsedPath = pathName.match(/^\/(\d+)/);
		let sensor = parsedPath && parsedPath.hasOwnProperty(1) ? parseInt(parsedPath[1], 10) : -1;

		response.writeHead(200, {'Content-type':'application/json'});
		response.write(sensors && sensors.hasOwnProperty(sensor) && sensors[sensor].active ? JSON.stringify(sensors[sensor]) : '{}');
		response.end();
	} catch (e) {
		console.error(e);
		response.writeHead(500, {'Content-type':'application/json'});
		response.write('{"error":"fail"}');
		response.end();
	}
	// });
}).listen(8080);
console.log('Listening at http://localhost:8080');
