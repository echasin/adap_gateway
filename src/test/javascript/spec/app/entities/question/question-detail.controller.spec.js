'use strict';

describe('Controller Tests', function() {

    describe('Question Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockQuestion, MockQuestiongroup, MockAnswer, MockSubquestion;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockQuestion = jasmine.createSpy('MockQuestion');
            MockQuestiongroup = jasmine.createSpy('MockQuestiongroup');
            MockAnswer = jasmine.createSpy('MockAnswer');
            MockSubquestion = jasmine.createSpy('MockSubquestion');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Question': MockQuestion,
                'Questiongroup': MockQuestiongroup,
                'Answer': MockAnswer,
                'Subquestion': MockSubquestion
            };
            createController = function() {
                $injector.get('$controller')("QuestionDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:questionUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
