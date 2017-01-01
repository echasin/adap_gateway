'use strict';

describe('Controller Tests', function() {

    describe('Scenariopathwaymbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockScenariopathwaymbr, MockScenario, MockPathway;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockScenariopathwaymbr = jasmine.createSpy('MockScenariopathwaymbr');
            MockScenario = jasmine.createSpy('MockScenario');
            MockPathway = jasmine.createSpy('MockPathway');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Scenariopathwaymbr': MockScenariopathwaymbr,
                'Scenario': MockScenario,
                'Pathway': MockPathway
            };
            createController = function() {
                $injector.get('$controller')("ScenariopathwaymbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:scenariopathwaymbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
