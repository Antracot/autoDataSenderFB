const SendData = require('../pages/sendData.po');
const using = require('jasmine-data-provider');
const dbUrl = require('./test-data/urls.td');


describe('Send data for users suite', () => {
	let sender, currentUrl;
	beforeEach(() => {
		sender = new SendData();
	});

	using(dbUrl.fbLinks, function(url) {
		it('Send info to user', () => {
			sender.goInMessager(url);
			sender.infoSender();
		});
	});
});