'use strict';

describe('Weapon e2e test', function () {

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

    it('should load Weapons', function () {
        entityMenu.click();
        element(by.css('[ui-sref="weapon"]')).click().then(function() {
            expect(element.all(by.css('h2')).first().getText()).toMatch(/Weapons/);
        });
    });

    it('should load create Weapon dialog', function () {
        element(by.css('[ui-sref="weapon.new"]')).click().then(function() {
            expect(element(by.css('h4.modal-title')).getAttribute("translate")).toMatch(/adapGatewayApp.weapon.home.createOrEditLabel/);
            element(by.css('button.close')).click();
        });
    });

    afterAll(function () {
        accountMenu.click();
        logout.click();
    });
});
