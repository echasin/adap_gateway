'use strict';

describe('Controller Tests', function() {

    describe('Pathway Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPathway, MockRecordtype, MockCategory, MockSubcategory, MockScenariopathwaymbr, MockPathwaypathwaymbr, MockWeapon, MockPathwaycountermeasurembr;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPathway = jasmine.createSpy('MockPathway');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockScenariopathwaymbr = jasmine.createSpy('MockScenariopathwaymbr');
            MockPathwaypathwaymbr = jasmine.createSpy('MockPathwaypathwaymbr');
            MockWeapon = jasmine.createSpy('MockWeapon');
            MockPathwaycountermeasurembr = jasmine.createSpy('MockPathwaycountermeasurembr');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Pathway': MockPathway,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Scenariopathwaymbr': MockScenariopathwaymbr,
                'Pathwaypathwaymbr': MockPathwaypathwaymbr,
                'Weapon': MockWeapon,
                'Pathwaycountermeasurembr': MockPathwaycountermeasurembr
            };
            createController = function() {
                $injector.get('$controller')("PathwayDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:pathwayUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
