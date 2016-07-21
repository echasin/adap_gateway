'use strict';

describe('Subquestion e2e test', function () {

    var username = element(by.id('username'));
    var password = element(by.id('password'));
    var entityMenu = element(by.id('entity-menu'));
    var accountMenu = element(by.id('account-menu'));
    var login = element(by.id('login'));
    var logout = element(by.id('logout'));

    beforeAll(function () {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    it('should load Subquestions', function () {
        entityMenu.click();
        element(by.css('[ui-sref="subquestion"]')).click().then(function() {
            expect(element.all(by.css('h2')).first().getText()).toMatch(/Subquestions/);
        });
    });

    it('should load create Subquestion dialog', function () {
        element(by.css('[ui-sref="subquestion.new"]')).click().then(function() {
            expect(element(by.css('h4.modal-title')).getText()).toMatch(/Create or edit a Subquestion/);
            element(by.css('button.close')).click();
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
