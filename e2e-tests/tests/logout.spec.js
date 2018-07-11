const authData = require('./test-data/auth.td');
const AuthPage = require('../pages/auth.po');

describe('Logout suite', () => {

	let page;
	beforeEach(() => {
		page = new AuthPage();
	});

	it('logOut in facebook', () => {
		page.logOut();
		browser.close();
	});

	
});