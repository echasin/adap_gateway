'use strict';

describe('Controller Tests', function() {

    describe('Countermeasure Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCountermeasure, MockRecordtype, MockCategory, MockSubcategory, MockPathwaycountermeasurembr;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCountermeasure = jasmine.createSpy('MockCountermeasure');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockPathwaycountermeasurembr = jasmine.createSpy('MockPathwaycountermeasurembr');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Countermeasure': MockCountermeasure,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Pathwaycountermeasurembr': MockPathwaycountermeasurembr
            };
            createController = function() {
                $injector.get('$controller')("CountermeasureDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:countermeasureUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
