'use strict';

describe('Controller Tests', function() {

    describe('Countermeasurefactor Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCountermeasurefactor, MockCountermeasure, MockPathway, MockCountermeasurefactortype, MockWeapon;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCountermeasurefactor = jasmine.createSpy('MockCountermeasurefactor');
            MockCountermeasure = jasmine.createSpy('MockCountermeasure');
            MockPathway = jasmine.createSpy('MockPathway');
            MockCountermeasurefactortype = jasmine.createSpy('MockCountermeasurefactortype');
            MockWeapon = jasmine.createSpy('MockWeapon');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Countermeasurefactor': MockCountermeasurefactor,
                'Countermeasure': MockCountermeasure,
                'Pathway': MockPathway,
                'Countermeasurefactortype': MockCountermeasurefactortype,
                'Weapon': MockWeapon
            };
            createController = function() {
                $injector.get('$controller')("CountermeasurefactorDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:countermeasurefactorUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
