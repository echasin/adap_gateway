exports.config = {
		  getPageTimeout: 600000,
		  allScriptsTimeout: 700000,
		  framework: 'custom',
		  // path relative to the current config file
		  
		  
		  
		  frameworkPath: require.resolve('protractor-cucumber-framework'),   //without serenity report
		//  frameworkPath: require.resolve('serenity-js'),    //with serenity report not work on ubuntu with me
		 
		  
		  serenity: {
		        dialect: 'cucumber'     // or 'mocha'
		    },
		  
		  capabilities: {
		    'browserName': 'chrome'
		  },

		  // Spec patterns are relative to this directory.
		  specs: [
		    './features/*.feature'
		  ],

		  baseURL: 'http://localhost:8099/',

		  cucumberOpts: {
		    require: './stepDef/stepDefinitions.js',
		    format:     'pretty'
		  },
		  
		  resultJsonOutputFile: 'report.json',
		  ignoreUncaughtExceptions: true
		  			
		  
		};