'use strict';

describe('Controller Tests', function() {

    describe('Strategymbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockStrategymbr, MockStrategy;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockStrategymbr = jasmine.createSpy('MockStrategymbr');
            MockStrategy = jasmine.createSpy('MockStrategy');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Strategymbr': MockStrategymbr,
                'Strategy': MockStrategy
            };
            createController = function() {
                $injector.get('$controller')("StrategymbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:strategymbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
