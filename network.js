var {networkInterfaces} = require('os');
var Koa = require('koa');
var mdns = require('multicast-dns');

var localIp = Object.values(networkInterfaces()).reduce((answer, interface) => {
	return answer || interface.reduce((answer, address) => {
		return answer ||
			(address.family === 'IPv4' && !address.internal && address.address);
	}, null)
}, null);

console.log('Local IP', localIp);

module.exports = ({name, port}) => {
	return new Promise((done, fail) => {
		var host = `${name}.local`;
		console.log(`Starting server on host ${host}`);
		console.log(``);

		var server = new Koa();

		server.use(ctx => {
			ctx.body = `${name} is working`
		})
		server.listen(port, host);


		var broadcaster = mdns();

		broadcaster.on('response', function(response) {
			console.log('got a response packet:', response)
		})

		broadcaster.on('query', function(query) {
			console.log('got a query packet:', query)
			broadcaster.respond({
				answers: [
					{
						name: host,
						type: 'A',
						ttl: 300,
						data: localIp
					}
				]
			})
		})

		return done(`${host}:${port}`);
	})
}