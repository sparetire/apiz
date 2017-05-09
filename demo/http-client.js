const Promise = require('bluebird');
const request = require('request');
const util = require('./util');

function HttpClient() {
	let self = this instanceof HttpClient ? this : Object.create(HttpClient.prototype);

	if (!util.isFunction(self.get)) {
		HttpClient.prototype.get = function (url, opts) {
			let option = opts || {};
			option.url = option.url || url;
			option.method = 'GET';
			option.proxy = 'http://127.0.0.1:2333';
			return new Promise((resolve, reject) => {
				request(option, (err, resp, body) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(body));
					}
				});
			});
		};
	}
	
	if (!util.isFunction(self.delete)) {
		HttpClient.prototype.delete = function (url, opts) {
			let option = opts || {};
			option.url = option.url || url;
			option.method = 'DELETE';
			option.proxy = 'http://127.0.0.1:2333';
			return new Promise((resolve, reject) => {
				request(option, (err, resp, body) => {
					if (err) {
						reject(err);
					} else {
						resolve(JSON.parse(body));
					}
				});
			});
		};
	}

	if (!util.isFunction(self.post)) {
		HttpClient.prototype.post = function (url, bodyOpts, bodyType) {
			let option = {};
			option.proxy = 'http://127.0.0.1:2333';
			if (typeof bodyOpts === 'string') {
				option.url = url;
				option.body = bodyOpts;
				option.method = 'POST';
				if (bodyType.toLowerCase() === 'json') {
					option.headers = {
						'Content-Type': 'application/json'
					};
				} else if (bodyType.toLowerCase() === 'form') {
					option.headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};
				}
				return new Promise((resolve, reject) => {
					request(option, (err, resp, body) => {
						if (err) {
							reject(err);
						} else {
							resolve(JSON.parse(body));
						}
					});
				});
			} else if (util.isObject(bodyOpts)) {
				bodyOpts.method = 'POST';
				if (bodyType.toLowerCase() === 'json') {
					bodyOpts.headers['Content-Type'] = 'application/json';
				} else if (bodyType.toLowerCase() === 'form') {
					bodyOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				}
				return new Promise((resolve, reject) => {
					request(bodyOpts, (err, resp, body) => {
						if (err) {
							reject(err);
						} else {
							resolve(JSON.parse(body));
						}
					});
				});
			}
		};
	}

	if (!util.isFunction(self.put)) {
		HttpClient.prototype.put = function (url, bodyOpts, bodyType) {
			let option = {};
			option.proxy = 'http://127.0.0.1:2333';
			if (typeof bodyOpts === 'string') {
				option.url = url;
				option.body = bodyOpts;
				option.method = 'PUT';
				if (bodyType.toLowerCase() === 'json') {
					option.headers = {
						'Content-Type': 'application/json'
					};
				} else if (bodyType.toLowerCase() === 'form') {
					option.headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};
				}
				return new Promise((resolve, reject) => {
					request(option, (err, resp, body) => {
						if (err) {
							reject(err);
						} else {
							resolve(JSON.parse(body));
						}
					});
				});
			} else if (util.isObject(bodyOpts)) {
				bodyOpts.method = 'POST';
				if (bodyType.toLowerCase() === 'json') {
					bodyOpts.headers['Content-Type'] = 'application/json';
				} else if (bodyType.toLowerCase() === 'form') {
					bodyOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				}
				return new Promise((resolve, reject) => {
					request(bodyOpts, (err, resp, body) => {
						if (err) {
							reject(err);
						} else {
							resolve(JSON.parse(body));
						}
					});
				});
			}
		};
	}

	return self;
}

module.exports = HttpClient;