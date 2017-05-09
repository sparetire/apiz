module.exports = {
	// 是否是对象
	isObject(obj) {
		return obj != null && typeof obj === 'object';
	},
	// 是否是空串
	isEmptyStr(str) {
		return typeof str === 'string' && !str.length;
	},
	// 是否是null
	isNull(obj) {
		return obj === null;
	},
	// 是否是null或undefined
	isNullOrUndefined(obj) {
		return obj == null;
	},
	// 是否是undefined
	isUndefined(obj) {
		return obj === undefined;
	},
	// 是否是空串或null或undefined
	isNullStrOrNull(str) {
		return this.isEmptyStr(str) || str == null;
	},
	// 是否是对象或null或undefined
	isObjectOrNull(obj) {
		return obj === undefined || typeof obj === 'object';
	},
	isFunction(obj) {
		return typeof obj === 'function';
	},
	base64Encode(data) {
		return new Buffer(data)
			.toString('base64');
	},
	base64DecodeToString(str, charset) {
		charset = charset || 'utf8';
		return new Buffer(str, 'base64')
			.toString(charset);
	},
	base64Decode(str) {
		return new Buffer(str, 'base64');
	}
};