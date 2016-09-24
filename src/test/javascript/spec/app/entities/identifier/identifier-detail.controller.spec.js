'use strict';

describe('Controller Tests', function() {

    describe('Identifier Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockIdentifier, MockAsset, MockKey;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockIdentifier = jasmine.createSpy('MockIdentifier');
            MockAsset = jasmine.createSpy('MockAsset');
            MockKey = jasmine.createSpy('MockKey');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Identifier': MockIdentifier,
                'Asset': MockAsset,
                'Key': MockKey
            };
            createController = function() {
                $injector.get('$controller')("IdentifierDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:identifierUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
