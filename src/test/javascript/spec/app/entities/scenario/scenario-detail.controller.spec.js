'use strict';

describe('Controller Tests', function() {

    describe('Scenario Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockScenario, MockRecordtype, MockCategory, MockSubcategory, MockScenariopathwaymbr;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockScenario = jasmine.createSpy('MockScenario');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockScenariopathwaymbr = jasmine.createSpy('MockScenariopathwaymbr');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Scenario': MockScenario,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Scenariopathwaymbr': MockScenariopathwaymbr
            };
            createController = function() {
                $injector.get('$controller')("ScenarioDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:scenarioUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
