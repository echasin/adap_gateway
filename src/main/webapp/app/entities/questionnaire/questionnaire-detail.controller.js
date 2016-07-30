(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDetailController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$http','$scope','$timeout','$rootScope', '$stateParams', 'entity', 'Questionnaire', 'Questiongroup','Question','Subquestion','Answer','Response'];

    function QuestionnaireDetailController($http,$scope,$timeout,$rootScope, $stateParams, entity, Questionnaire, Questiongroup, Question,Subquestion,Answer,Response) {
        var vm = this;
        vm.questionnaire = entity;
        vm.loadAllQuestionGroup = loadAllQuestionGroup;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:questionnaireUpdate', function(event, result) {
            vm.questionnaire = result;
        });
        $scope.$on('$destroy', unsubscribe);
       
        vm.loadAllQuestionGroup();
        
        var questions=[];
        vm.questions=[];
        
        function loadAllQuestionGroup () {
        Questiongroup.query({}).$promise.then(function(group){
        	vm.questiongroups = group;
            for(var i=0;i<group.length;i++){
      		   var grouptitle=group[i].title
             	Question.questionsByQuestionGroup({id:group[i].id}).$promise.then(function(question){
                  questions.push.apply(questions,question);
             	    for(var j=0;j<question.length;j++){ 
             		   (function(index) {
             			    setTimeout(function() {
             			  //    if(question[index].type=="Array"){
                     		  Subquestion.subquestionsByQuestion({id:question[index].id}).$promise.then(function(subquestion){
                     			   question[index].subquestion=subquestion; 
                              	   Answer.answersByQuestion({id:question[index].id}).$promise.then(function(answer){
                              		   question[index].answer=answer;
                              		   vm.questions.push(question[index]);
                              		   console.log(vm.questions);
                                     });
                                 
                         	     }); 
             			        //}
             			    });
             			  })(j); 
             	  }
             });
            }
          });
        }
        
        vm.selectedAnswer=[];
        
        vm.getChoiceAnswer = function(group,question,answer){
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question)
        	console.log("answer : "+answer);
        	console.log("---------------------------------");
        	vm.choiceAnswer={"questiongroup":group,"question":question,"answer":answer}
        }
        
        vm.gridAnswer=[]; 
        vm.getGridAnswer = function(group,question,subquestion,answer) {
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question);
        	console.log("subquestion : "+subquestion);
        	console.log("answer : "+answer);
        	console.log("---------------------------------");
        	var answers={"questiongroup":group,"question":question,"subquestion":subquestion,"answer":answer}
        	vm.gridAnswer.push(answers);
       }
        
        vm.saveAnswer=function(){
        	var questionnaire=$stateParams.id
            vm.selectedAnswer.push(vm.choiceAnswer);
            vm.selectedAnswer.push(vm.gridAnswer);
        	console.log(vm.selectedAnswer)
        	var result=JSON.stringify(vm.selectedAnswer);
        	console.log(result);
        	
        	$http.get('/adap_assessment/api/saveResponse/'+questionnaire+'/'+result)
        	.success(function (data) {

        });
        	vm.selectedAnswer=[]
       }
        

    }
})();
