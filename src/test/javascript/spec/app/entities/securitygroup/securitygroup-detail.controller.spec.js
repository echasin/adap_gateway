'use strict';

describe('Controller Tests', function() {

    describe('Securitygroup Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSecuritygroup, MockSecuritygrouprule;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSecuritygroup = jasmine.createSpy('MockSecuritygroup');
            MockSecuritygrouprule = jasmine.createSpy('MockSecuritygrouprule');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Securitygroup': MockSecuritygroup,
                'Securitygrouprule': MockSecuritygrouprule
            };
            createController = function() {
                $injector.get('$controller')("SecuritygroupDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:securitygroupUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
