'use strict';

describe('Controller Tests', function() {

    describe('Questiongroup Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockQuestiongroup, MockQuestion, MockQuestionnaire;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockQuestiongroup = jasmine.createSpy('MockQuestiongroup');
            MockQuestion = jasmine.createSpy('MockQuestion');
            MockQuestionnaire = jasmine.createSpy('MockQuestionnaire');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Questiongroup': MockQuestiongroup,
                'Question': MockQuestion,
                'Questionnaire': MockQuestionnaire
            };
            createController = function() {
                $injector.get('$controller')("QuestiongroupDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:questiongroupUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
