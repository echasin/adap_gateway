module.exports = function() {
  
  this.Given(/^I go to "([^"]*)"$/, {timeout: 60 * 1000},function (site, callback) {
	  browser.get(site)
	     .then(callback);
      browser.driver.manage().window().maximize();
    });

  this.When(/^I add login credential$/, {timeout: 60 * 1000},function (callback) {
	 
	  var username = element(by.id('username'));
	  var password = element(by.id('password'));
	  var accountMenu = element(by.id('account-menu'));
	  var login = element(by.id('login'));
	  var logout = element(by.id('logout'));
	  accountMenu.click();
      login.click();

      username.sendKeys('admin');
      password.sendKeys('admin');
      element(by.css('button[type=submit]')).click();
      callback();
    });
  
  
  
   this.Then(/^I go to scenario home page$/,{timeout: 60 * 1000}, function (callback) {
	    var entityMenu = element(by.id('entity-menu'));
	    entityMenu.click();
        element(by.css('[ui-sref="scenario"]')).click();
        callback();
   });
  
  
   this.Then(/^I go to scenario details page$/, function (callback) {
	  element(by.repeater('scenario in vm.scenarios').row(0).column('scenario.id')).click();
      callback();
   });

  
   this.Then(/^I go to edit attack tree page$/, function (callback) {
	  element(by.id('editattacktree')).click();
      callback();
    });
   

   this.Then(/^build attack tree$/, function (callback) {
	   element(by.id('primarygoal')).click();
		browser.sleep(1000);
		var plot0=element(by.id('j_1'));
		browser.actions().
        dragAndDrop(plot0, {x: 400, y: 1}).
        perform();
		element(by.id('vectorid')).click();
		browser.sleep(1000);
		element(by.id('vector')).click();
		var plot0=element(by.id('j_2'));
		browser.sleep(1000);
		browser.actions().
        dragAndDrop(plot0, {x: 400, y: 100}).
        perform();
		
		element(by.id('vector')).click();
		var plot0=element(by.id('j_3'));
		browser.sleep(1000);
		browser.actions().
        dragAndDrop(plot0, {x: 600, y: 100}).
        perform();
		
		browser.sleep(1000);
		element(by.buttonText('Drag Line')).click();
		element(by.id('j_1')).click();   
		browser.sleep(5000);
		callback();
     });


  
}