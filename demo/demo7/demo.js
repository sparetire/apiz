const config = require('./config');
const HttpClient = require('../http-client');
const APIs = require('../../index');

const client = new HttpClient();
const apis = new APIs(config, client);

apis.test({
	hello: 'hello',
	world: 'world'
}).then(data => console.log(data));