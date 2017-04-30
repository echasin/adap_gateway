exports.config = {
		  getPageTimeout: 600000,
		  allScriptsTimeout: 700000,
		  framework: 'custom',
		  // path relative to the current config file
		  frameworkPath: require.resolve('protractor-cucumber-framework'),
		 // frameworkPath: require.resolve('serenity-js'), 
		 
		  /**
		  serenity: {
		        dialect: 'cucumber'     // or 'mocha'
		    },
		  **/
		  capabilities: {
		    'browserName': 'chrome'
		  },

		  // Spec patterns are relative to this directory.
		  specs: [
		    '/home/ali/git/adap_gateway/src/test/features/*.feature'
		  ],

		  baseURL: 'http://localhost:8099/',

		  cucumberOpts: {
		    require: '/home/ali/git/adap_gateway/src/test/javascript/stepDef/stepDefinitions.js'
		  },
		  
		  resultJsonOutputFile: 'report.json',
		  ignoreUncaughtExceptions: true
		  			  
		};