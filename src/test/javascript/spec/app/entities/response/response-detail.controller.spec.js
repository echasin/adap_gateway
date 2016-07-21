'use strict';

describe('Controller Tests', function() {

    describe('Response Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockResponse, MockQuestionnaire;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockResponse = jasmine.createSpy('MockResponse');
            MockQuestionnaire = jasmine.createSpy('MockQuestionnaire');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Response': MockResponse,
                'Questionnaire': MockQuestionnaire
            };
            createController = function() {
                $injector.get('$controller')("ResponseDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:responseUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
