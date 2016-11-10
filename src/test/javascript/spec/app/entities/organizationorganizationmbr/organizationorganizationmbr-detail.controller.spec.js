'use strict';

describe('Controller Tests', function() {

    describe('Organizationorganizationmbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockOrganizationorganizationmbr, MockOrganization;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockOrganizationorganizationmbr = jasmine.createSpy('MockOrganizationorganizationmbr');
            MockOrganization = jasmine.createSpy('MockOrganization');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Organizationorganizationmbr': MockOrganizationorganizationmbr,
                'Organization': MockOrganization
            };
            createController = function() {
                $injector.get('$controller')("OrganizationorganizationmbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:organizationorganizationmbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
