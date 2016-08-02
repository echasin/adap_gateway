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
        
        var questiongroup=[];
        vm.questiongroup=[];
        
        function loadAllQuestionGroup () {
        Questiongroup.query({}).$promise.then(function(group){
        	questiongroup.push.apply(questiongroup,group);
            for(var i=0;i<group.length;i++){
            	(function(item) {
     			    setTimeout(function() {
      		        var grouptitle=group[item].title
                	Question.questionsByQuestionGroup({id:group[item].id}).$promise.then(function(question){
                    group[item].question=question;             		
             	    for(var j=0;j<question.length;j++){ 
             		   (function(index) {
             			    setTimeout(function() {
                     		  Subquestion.subquestionsByQuestion({id:question[index].id}).$promise.then(function(subquestion){
                     			   question[index].subquestion=subquestion; 
                              	   Answer.answersByQuestion({id:question[index].id}).$promise.then(function(answer){
                              		   question[index].answer=answer;

                                     });
                                 
                         	     }); 
             			    });
             			  })(j); 
             	  }
             	   vm.questiongroup=group;
             	   console.log(vm.questiongroup)
             	    
             });
            	
     			   });
   			  })(i);
            }
          });
        }
        /**
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
        **/
        
        
        vm.result={};
        vm.result.questiongroups={};
        vm.result.questiongroups.questions=[];
        vm.result.questiongroups.questions.subquestions=[];
        
        
        vm.getChoiceAnswer = function(group,question,response){
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question)
        	console.log("response : "+response);
        	console.log("---------------------------------");
        	Question.get({id: question}, function(result) {        	
        	var question={
                "question.id": result.id,
                "question.manadatory": result.mandatory,
                "question.code": result.code,
                "question.position": result.position,
                "question.help": result.help,
                "question": result.question,
                "question.type": result.type,
                "response": response
              }
        	vm.result.questiongroups.questions.push(question);
        	console.log(vm.result)
        	var last=JSON.stringify(vm.result);
        	console.log(last)
        	});
        //  vm.choiceAnswer={"questiongroup":group,"question":question,"response":response}
        }
        
        vm.gridAnswer=[]; 
        vm.getGridAnswer = function(group,question,subquestion,response) {
        	console.log("---------------------------------");
        	console.log("question group : "+group);
        	console.log("question : "+question);
        	console.log("subquestion : "+subquestion);
        	console.log("answer : "+response);
        	console.log("---------------------------------");
        	Question.get({id: question}, function(result) {        	
            var question={
                    "question.id": result.id,
                    "question.manadatory": result.mandatory,
                    "question.code": result.code,
                    "question.position": result.position,
                    "question.help": result.help,
                    "question": result.question,
                    "question.type": result.type,
                    "response": response
                  }
            	vm.result.questiongroups.questions.push(question);
                Subquestion.get({id: subquestion}, function(result) {   
                 var subquestion= {
                         "subquestion.id": result.id,
                         "subquestion.code": result.code,
                         "subquestion.position": result.position,
                         "subquestion": result.subquestion,
                         "response": response
                       }
                 vm.result.questiongroups.questions.subquestions.push(subquestion);
                 console.log(vm.result);
                 var last=JSON.stringify(vm.result);
             	console.log(last)
            });
            	});
       }
        
        vm.saveAnswer=function(){
        	var questionnaire=$stateParams.id
        	var result=JSON.stringify(vm.result);
        	console.log(result);
        	
        	$http.get('/adap_assessment/api/saveResponse/'+questionnaire+'/'+vm.result)
        	.success(function (data) {

        });
        	vm.selectedAnswer=[]
       }
        
        
        vm.getmultiselect=function(group,question,subquestion){
        	console.log(group);
        	console.log(question);
        	console.log(subquestion);
        }
        
        vm.getmultiselecttext=function(group,question,subquestion){
        	console.log(group);
        	console.log(question);
        	console.log(subquestion);
        	console.log(vm.text);
        	
        }
        
        vm.getLargeText=function(){
        	console.log(vm.largeText)
        }
        

    }
})();


/**
{
"response.id": 1,
"questionnaire.id": 1001,
"questionnaire.name": "My Sample Question",
"questiongroups": [
  {
    "questiongroup.id": 1001,
    "questiongroup.name": "questiongroup name one",
    "questions": [
      {
        "question.id": 1001,
        "question.manadatory": "TRUE",
        "question.code": "Q1",
        "question.position": 1,
        "question.help": "Please used the following  scoring system  Score of 1 -  Dont Like Score of 3  - See Some Value Score of 5  -  Great Tool",
        "question": "What is our evaluation of the Jhipster 3.x Application.",
        "question.type": "5 Point Choice",
        "response": "3"
      },
      {
        "question.id": 1002,
        "question.manadatory": "TRUE",
        "question.code": "Q2",
        "question.position": 2,
        "question.help": "For each Subquestion (Row) select the best Aswer (Column)",
        "question": "A Array Question Type uses Subquestions (Rows) and Answer Options (Columns)",
        "question.type": "array",
        "subquestion": [
          {
            "subquestion.id": 1001,
            "subquestion.code": "Sub1",
            "subquestion.position": 1,
            "subquestion": "Subquestion One.",
            "response": "Answer One"
          },
          {
            "question.id": 1002,
            "question.code": "Sub2",
            "question.position": 2,
            "subquestion": "Subquestion two.",
            "response": "Answer Two"
          }
        ]
      }
    ]
  }
*/