const authData = require('./test-data/auth.td');
const AuthPage = require('../pages/auth.po');

describe('Login suite', () => {

	let page;
	beforeEach(() => {
		page = new AuthPage();
	});

	it('logIn in facebook', () => {
		expect(page.getTitle()).toContain(authData.pageTitle);
		page.logIn(authData.login.dataIn);
	});
	
});