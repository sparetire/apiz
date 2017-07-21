/* global qs */
/**
 * {
 *   host,
 *   path,
 *   url,
 *   type,
 *   restful,
 *   method,
 *   host
 * }
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['querystring'], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory(require('querystring'));
	} else {
		root.APIs = factory(qs);
	}
})(this, function (QueryString) {

	var methods = {
		GET: 'GET',
		POST: 'POST',
		PUT: 'PUT',
		PATCH: 'PATCH',
		DELETE: 'DELETE',
		HEAD: 'HEAD',
		OPTIONS: 'OPTIONS'
	};

	function _format(opts) {
		if (opts.url) {
			return opts.url;
		}
		var host = opts.host,
			path = opts.path;
		if (host) {
			if (path) {
				(host.charAt(host.length - 1) === '/') && (host = host.slice(0, host.length -
					1));
				return host + path;
			} else {
				return host;
			}
		} else {
			(path.charAt(0) !== '/') && (path = '/' + path);
			return path;
		}
	}
	
	function _get(args) {
		var info = arguments[arguments.length-1],
			url = info.url,
			restful = info.restful,
			client = info.client,
			qs = null,
			params = null,
			opts = null,
			flag = null;
			
		if (typeof arguments[1] === 'boolean') {
			flag = arguments[1];
			if (flag) {
				opts = arguments[0];
			} else {
				if (restful) {
					params = arguments[0];
				} else {
					qs = arguments[0];
				}
			}
		} else if (restful) {
			if (arguments.length > 2) {
				params = arguments[0];
				qs = arguments[1];
			} else if (arguments.length > 1) {
				params = arguments[0];
			}
		} else if (arguments.length > 1) {
			qs = arguments[0];
		}

		if (flag) {
			return client.get(url, opts);
		}

		if (!qs && !params) {
			return client.get(url);
		}

		if (params) {
			var reg = /{(\w+)}/g;
			url = url.replace(reg, function (m, v) {
				if (params[v] == null) {
					throw new Error('The parameter does\'t have an property named ' + v);
				}
				return encodeURIComponent(params[v]);
			});
		}

		if (qs) {
			qs = QueryString.stringify(qs);
			url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs;
		}
		return client.get(url);
	}

	function _delete(args) {
		var info = arguments[arguments.length-1],
			url = info.url,
			restful = info.restful,
			client = info.client,
			qs = null,
			params = null,
			opts = null,
			flag = null;

		if (typeof arguments[1] === 'boolean') {
			flag = arguments[1];
			if (flag) {
				opts = arguments[0];
			} else {
				if (restful) {
					params = arguments[0];
				} else {
					qs = arguments[0];
				}
			}
		} else if (restful) {
			if (arguments.length > 2) {
				params = arguments[0];
				qs = arguments[1];
			} else if (arguments.length > 1) {
				params = arguments[0];
			}
		} else if (arguments.length > 1) {
			qs = arguments[0];
		}

		if (flag) {
			return client.delete(url, opts);
		}

		if (!qs && !params) {
			return client.delete(url);
		}

		if (params) {
			var reg = /{(\w+)}/g;
			url = url.replace(reg, function (m, v) {
				if (params[v] == null) {
					throw new Error('The parameter does\'t have an property named ' + v);
				}
				return encodeURIComponent(params[v]);
			});
		}

		if (qs) {
			qs = QueryString.stringify(qs);
			url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs;
		}
		return client.delete(url);
	}

	function _post(args) {
		var info = arguments[arguments.length-1],
			url = info.url,
			type = info.type,
			restful = info.restful,
			client = info.client,
			qs = null,
			params = null,
			body = null,
			opts = null,
			flag = null;

		if (typeof arguments[1] === 'boolean') {
			flag = arguments[1];
			if (flag) {
				opts = arguments[0];
			} else {
				body = arguments[0];
			}
		} else if (restful) {
			if (arguments.length > 3) {
				body = arguments[0];
				params = arguments[1];
				qs = arguments[2];
			} else if (arguments.length > 2) {
				body = arguments[0];
				params = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		} else {
			if (arguments.length > 2) {
				body = arguments[0];
				qs = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		}

		if (flag) {
			return client.post(url, opts);
		}
		
		if (type === 'json') {
			body = JSON.stringify(body);
		} else {
			body = QueryString.stringify(body);
		}

		if (!qs && !params) {
			return client.post(url, body, type);
		}
		
		if (params) {
			var reg = /{(\w+)}/g;
			url = url.replace(reg, function (m, v) {
				if (params[v] == null) {
					throw new Error('The parameter does\'t have an property named ' + v);
				}
				return encodeURIComponent(params[v]);
			});
		}

		if (qs) {
			qs = QueryString.stringify(qs);
			url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs;
		}


		return client.post(url, body, type);
	}
	
	function _put(args) {
		var info = arguments[arguments.length-1],
			url = info.url,
			type = info.type,
			restful = info.restful,
			client = info.client,
			qs = null,
			params = null,
			body = null,
			opts = null,
			flag = null;

		if (typeof arguments[1] === 'boolean') {
			flag = arguments[1];
			if (flag) {
				opts = arguments[0];
			} else {
				body = arguments[0];
			}
		} else if (restful) {
			if (arguments.length > 3) {
				body = arguments[0];
				params = arguments[1];
				qs = arguments[2];
			} else if (arguments.length > 2) {
				body = arguments[0];
				params = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		} else {
			if (arguments.length > 2) {
				body = arguments[0];
				qs = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		}

		if (flag) {
			return client.put(url, opts);
		}
		
		if (type === 'json') {
			body = JSON.stringify(body);
		} else {
			body = QueryString.stringify(body);
		}

		if (!qs && !params) {
			return client.put(url, body, type);
		}
		
		if (params) {
			var reg = /{(\w+)}/g;
			url = url.replace(reg, function (m, v) {
				if (params[v] == null) {
					throw new Error('The parameter does\'t have an property named ' + v);
				}
				return encodeURIComponent(params[v]);
			});
		}

		if (qs) {
			qs = QueryString.stringify(qs);
			url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs;
		}


		return client.put(url, body, type);
	}


	function _patch(args) {
		var info = arguments[arguments.length-1],
			url = info.url,
			type = info.type,
			restful = info.restful,
			client = info.client,
			qs = null,
			params = null,
			body = null,
			opts = null,
			flag = null;

		if (typeof arguments[1] === 'boolean') {
			flag = arguments[1];
			if (flag) {
				opts = arguments[0];
			} else {
				body = arguments[0];
			}
		} else if (restful) {
			if (arguments.length > 3) {
				body = arguments[0];
				params = arguments[1];
				qs = arguments[2];
			} else if (arguments.length > 2) {
				body = arguments[0];
				params = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		} else {
			if (arguments.length > 2) {
				body = arguments[0];
				qs = arguments[1];
			} else if (arguments.length > 1) {
				body = arguments[0];
			} else {
				throw new Error('Body can\'t be empty.');
			}
		}

		if (flag) {
			return client.patch(url, opts);
		}
		
		if (type === 'json') {
			body = JSON.stringify(body);
		} else {
			body = QueryString.stringify(body);
		}

		if (!qs && !params) {
			return client.patch(url, body, type);
		}
		
		if (params) {
			var reg = /{(\w+)}/g;
			url = url.replace(reg, function (m, v) {
				if (params[v] == null) {
					throw new Error('The parameter does\'t have an property named ' + v);
				}
				return encodeURIComponent(params[v]);
			});
		}

		if (qs) {
			qs = QueryString.stringify(qs);
			url = url.indexOf('?') === -1 ? url + '?' + qs : url + '&' + qs;
		}


		return client.patch(url, body, type);
	}


	function apiFactory(config, httpClient) {
		var func = null,
			method = (config.method && config.method.toUpperCase()) || methods.GET,
			apiInfo = {
				url: _format(config),
				type: config.type || 'json',
				restful: config.restful || false,
				client: httpClient
			};
		switch (method) {
			case methods.GET:
				func = function (args) {
					return _get.apply(this, Array.prototype.slice.call(arguments).concat(apiInfo));
				};
				break;
			case methods.DELETE:
				func = function (args) {
					return _delete.apply(this, Array.prototype.slice.call(arguments).concat(apiInfo));
				};
				break;
			case methods.POST:
				func = function (args) {
					return _post.apply(this, Array.prototype.slice.call(arguments).concat(apiInfo));
				};
				break;
			case methods.PUT:
				func = function (args) {
					return _put.apply(this, Array.prototype.slice.call(arguments).concat(apiInfo));
				};
				break;
			case methods.PATCH:
				func = function (args) {
					return _patch.apply(this, Array.prototype.slice.call(arguments).concat(apiInfo));
				};
				break;
		
			default:
				throw new Error('Invalid http method: ' + method);
		}
		func.url = apiInfo.url;
		func.method = method;
		func.restful = apiInfo.restful;
		if (method === methods.POST || method === methods.PUT || method.PATCH) {
			func.type = apiInfo.type;
		} else {
			func.type = null;
		}
		return func;
	}

	function APIs(config, client) {
		var self = this instanceof APIs ? this : Object.create(APIs.prototype);
		var defaultHost = null;
		for (var key in config) {
			if (key === 'host') {
				defaultHost = config[key];
			} else {
				var api = config[key];
				if (!api.host && !api.url) {
					api.host = defaultHost;
				}
				self[key] = apiFactory(api, client);
			}
		}
		return self;
	}

	return APIs;

});