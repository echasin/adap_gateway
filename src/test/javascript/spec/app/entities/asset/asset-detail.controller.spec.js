'use strict';

describe('Controller Tests', function() {

    describe('Asset Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockAsset, MockLocation, MockScore, MockCategory, MockSubcategory, MockRecordtype, MockAssetassetmbr;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockAsset = jasmine.createSpy('MockAsset');
            MockLocation = jasmine.createSpy('MockLocation');
            MockScore = jasmine.createSpy('MockScore');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockAssetassetmbr = jasmine.createSpy('MockAssetassetmbr');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Asset': MockAsset,
                'Location': MockLocation,
                'Score': MockScore,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Recordtype': MockRecordtype,
                'Assetassetmbr': MockAssetassetmbr
            };
            createController = function() {
                $injector.get('$controller')("AssetDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:assetUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
