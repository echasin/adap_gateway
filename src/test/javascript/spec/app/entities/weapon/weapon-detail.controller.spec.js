'use strict';

describe('Controller Tests', function() {

    describe('Weapon Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockWeapon, MockRecordtype, MockCategory, MockSubcategory, MockPathway, MockCountermeasurefactor;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockWeapon = jasmine.createSpy('MockWeapon');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockPathway = jasmine.createSpy('MockPathway');
            MockCountermeasurefactor = jasmine.createSpy('MockCountermeasurefactor');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Weapon': MockWeapon,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Pathway': MockPathway,
                'Countermeasurefactor': MockCountermeasurefactor
            };
            createController = function() {
                $injector.get('$controller')("WeaponDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:weaponUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
