'use strict';

describe('Controller Tests', function() {

    describe('Questionnaire Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockQuestionnaire, MockQuestiongroup;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockQuestionnaire = jasmine.createSpy('MockQuestionnaire');
            MockQuestiongroup = jasmine.createSpy('MockQuestiongroup');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Questionnaire': MockQuestionnaire,
                'Questiongroup': MockQuestiongroup
            };
            createController = function() {
                $injector.get('$controller')("QuestionnaireDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:questionnaireUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
