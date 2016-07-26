'use strict';

describe('Controller Tests', function() {

    describe('Identifier Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockIdentifier, MockAlert, MockEvent;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockIdentifier = jasmine.createSpy('MockIdentifier');
            MockAlert = jasmine.createSpy('MockAlert');
            MockEvent = jasmine.createSpy('MockEvent');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Identifier': MockIdentifier,
                'Alert': MockAlert,
                'Event': MockEvent
            };
            createController = function() {
                $injector.get('$controller')("IdentifierDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:identifierUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
