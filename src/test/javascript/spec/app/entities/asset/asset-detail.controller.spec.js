'use strict';

describe('Controller Tests', function() {

    describe('Asset Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockAsset, MockLocation, MockScore;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockAsset = jasmine.createSpy('MockAsset');
            MockLocation = jasmine.createSpy('MockLocation');
            MockScore = jasmine.createSpy('MockScore');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Asset': MockAsset,
                'Location': MockLocation,
                'Score': MockScore
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
