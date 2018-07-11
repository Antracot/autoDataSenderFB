'use strict';

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const DOMAIN = process.env.DOMAIN

exports.config = {

	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		print: function() {},
		defaultTimeoutInterval: 180000
	},

	directConnect: true,
	capabilities: {
		browserName: 'chrome',
		'chromeOptions': {
			prefs: {
				'profile.managed_default_content_settings.notifications': 1
			} 
		},
		chromeOptions: {
			args: ["--headless"]
		}
	},

	onPrepare: function() {

		browser.ignoreSynchronization = true;

		global.isAngularSite = function(flag) {
			browser.ingoneSynchronization = !flag;
		}
		global.bd = browser.driver;

		browser.get('https://facebook.com');
		browser.sleep(3000);
		browser.driver.manage().window().maximize();

		jasmine.getEnv().addReporter(new SpecReporter({
			spec: {
				displayStacktrace: true
			},
		}));
	},

	specs: [
		'e2e-tests/tests/login.spec.js',
		'e2e-tests/tests/sender.spec.js',
		'e2e-tests/tests/logout.spec.js'
	]
};