const Chance = require('chance');
const Util = require('../../common/util');
let ch = new Chance();

const AuthData = function() {

	const EMAIL = 'YOUR_LOGIN';
	const PASS = 'YOUR_PASSWORD';

	this.pageTitle = 'Facebook';
	this.login = {
		dataIn: {
			'#email': EMAIL,
			'#pass': PASS
		}
	};

};

let authdata = new AuthData();
module.exports = authdata;
