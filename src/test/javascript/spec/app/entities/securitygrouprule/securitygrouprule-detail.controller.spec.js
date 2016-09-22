'use strict';

describe('Controller Tests', function() {

    describe('Securitygrouprule Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSecuritygrouprule, MockSecuritygroup;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSecuritygrouprule = jasmine.createSpy('MockSecuritygrouprule');
            MockSecuritygroup = jasmine.createSpy('MockSecuritygroup');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Securitygrouprule': MockSecuritygrouprule,
                'Securitygroup': MockSecuritygroup
            };
            createController = function() {
                $injector.get('$controller')("SecuritygroupruleDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:securitygroupruleUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
