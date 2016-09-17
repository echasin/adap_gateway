'use strict';

describe('Controller Tests', function() {

    describe('Subcategory Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockSubcategory, MockCategory, MockAsset;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockCategory = jasmine.createSpy('MockCategory');
            MockAsset = jasmine.createSpy('MockAsset');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Subcategory': MockSubcategory,
                'Category': MockCategory,
                'Asset': MockAsset
            };
            createController = function() {
                $injector.get('$controller')("SubcategoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:subcategoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
