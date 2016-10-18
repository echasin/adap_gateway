'use strict';

describe('Controller Tests', function() {

    describe('Logicoperator Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockLogicoperator, MockQuestion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockLogicoperator = jasmine.createSpy('MockLogicoperator');
            MockQuestion = jasmine.createSpy('MockQuestion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Logicoperator': MockLogicoperator,
                'Question': MockQuestion
            };
            createController = function() {
                $injector.get('$controller')("LogicoperatorDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:logicoperatorUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
