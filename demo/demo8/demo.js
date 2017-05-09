const config = require('./config');
const HttpClient = require('../http-client');
const APIs = require('../../index');

const client = new HttpClient();
const apis = new APIs(config, client);

apis.test({
	hello: 'hello',
	world: 'world'
}, {
	arg0: 'arg0',
	arg1: 'arg1',
}).then(data => console.log(data));