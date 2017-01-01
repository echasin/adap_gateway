'use strict';

describe('Controller Tests', function() {

    describe('Pathwaypathwaymbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPathwaypathwaymbr, MockPathway;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPathwaypathwaymbr = jasmine.createSpy('MockPathwaypathwaymbr');
            MockPathway = jasmine.createSpy('MockPathway');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Pathwaypathwaymbr': MockPathwaypathwaymbr,
                'Pathway': MockPathway
            };
            createController = function() {
                $injector.get('$controller')("PathwaypathwaymbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:pathwaypathwaymbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
