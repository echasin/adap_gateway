'use strict';

describe('Controller Tests', function() {

    describe('Countermeasurefactortype Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCountermeasurefactortype, MockCountermeasurefactor;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCountermeasurefactortype = jasmine.createSpy('MockCountermeasurefactortype');
            MockCountermeasurefactor = jasmine.createSpy('MockCountermeasurefactor');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Countermeasurefactortype': MockCountermeasurefactortype,
                'Countermeasurefactor': MockCountermeasurefactor
            };
            createController = function() {
                $injector.get('$controller')("CountermeasurefactortypeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:countermeasurefactortypeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
