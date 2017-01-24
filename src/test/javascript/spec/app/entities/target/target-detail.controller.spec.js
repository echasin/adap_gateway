'use strict';

describe('Controller Tests', function() {

    describe('Target Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTarget, MockRecordtype, MockCategory, MockSubcategory, MockPathway;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTarget = jasmine.createSpy('MockTarget');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockPathway = jasmine.createSpy('MockPathway');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Target': MockTarget,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Pathway': MockPathway
            };
            createController = function() {
                $injector.get('$controller')("TargetDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:targetUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
