'use strict';

describe('Controller Tests', function() {

    describe('Questionaire Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockQuestionaire, MockQuestiongroup;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockQuestionaire = jasmine.createSpy('MockQuestionaire');
            MockQuestiongroup = jasmine.createSpy('MockQuestiongroup');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Questionaire': MockQuestionaire,
                'Questiongroup': MockQuestiongroup
            };
            createController = function() {
                $injector.get('$controller')("QuestionaireDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:questionaireUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
