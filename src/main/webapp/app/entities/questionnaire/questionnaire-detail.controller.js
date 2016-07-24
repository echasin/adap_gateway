(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDetailController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Questionnaire', 'Questiongroup','Question','Subquestion','Answer'];

    function QuestionnaireDetailController($scope, $rootScope, $stateParams, entity, Questionnaire, Questiongroup, Question,Subquestion,Answer) {
        var vm = this;
        vm.questionnaire = entity;
        vm.loadAllQuestionGroup = loadAllQuestionGroup;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:questionnaireUpdate', function(event, result) {
            vm.questionnaire = result;
        });
        $scope.$on('$destroy', unsubscribe);
       
        vm.loadAllQuestionGroup();
        var data=[];
        
        function loadAllQuestionGroup () {
        Questiongroup.query({}).$promise.then(function(group){
        	vm.questiongroups = group;
            console.log(group);
            for(var i=0;i<group.length;i++){
      		   var grouptitle=group[i].title
             	Question.questionsByQuestionGroup({id:group[i].id}).$promise.then(function(question){
             		vm.question = question; 
             	   for(var j=0;j<question.length;j++){
             		  Subquestion.subquestionsByQuestion({id:question[i].id}).$promise.then(function(subquestion){
                    		vm.subquestions=subquestion;
                   for(var j=0;j<question.length;j++){
                	   Answer.answersByQuestion({id:subquestion[i].id}).$promise.then(function(answer){
                		   vm.answers=answer;
                       });
                   }
                    	});
                  	   }
             });
            }
          });
        }
        
        
        vm.getChoiceAnswer = function(group,question,answer){
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question)
        	console.log("answer : "+answer);
        	console.log("---------------------------------");
        }
                    
        vm.getGridAnswer = function(group,question,subquestion,answer) {
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question);
        	console.log("subquestion : "+subquestion);
        	console.log("answer : "+answer);
        	console.log("---------------------------------");
       }
        
        vm.saveAnswer=function(){
        	//save answer to database
        }
        

    }
})();
