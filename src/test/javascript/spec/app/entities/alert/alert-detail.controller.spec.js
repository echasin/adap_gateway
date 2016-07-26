'use strict';

describe('Controller Tests', function() {

    describe('Alert Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAlert, MockIdentifier;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAlert = jasmine.createSpy('MockAlert');
            MockIdentifier = jasmine.createSpy('MockIdentifier');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Alert': MockAlert,
                'Identifier': MockIdentifier
            };
            createController = function() {
                $injector.get('$controller')("AlertDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:alertUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
