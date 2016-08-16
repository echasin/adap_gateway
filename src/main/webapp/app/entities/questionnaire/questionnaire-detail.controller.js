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
                                 	   Response.responseByUserAndDate().$promise.then(function(response){
                                     		var response=JSON.parse(response.details);
                                		    for(var i=0;i<response.questiongroups.length;i++){
                                     			 for(var j=0;j<response.questiongroups[i].questions.length;j++){                                     				 
                                     				if(response.questiongroups[i].questions[j].question==question[index].id){
                                     					for(var w=0;w<question[index].subquestion.length;w++){
                                     						if(response.questiongroups[i].questions[j].subquestion==question[index].subquestion[w].id){
                                     						question[index].subquestion[w].response=response.questiongroups[i].questions[j].response;
                                     						}
                                     					}
                                     					question[index].response=response.questiongroups[i].questions[j].response;
                                     				}      
                                     			 }
                                     		   }                               		    
                                     	  });                               	  
                            	     }); 
                			    });
                			  })(j); 
                	  }
                	   vm.questiongroup=group;
                	   console.log(vm.questiongroup);
                });
        			   });
      			  })(i);
               }
             
            });
           }
        
        
        vm.result=[];
        
        vm.getChoiceAnswer = function(group,question,response){
        	function findquestion(item) { 
                return item.question === question;
            }
            if(vm.result.find(findquestion)!=null){
    			$.each(vm.result, function() {
    				if (this.question == question) {
    			        this.response = response;
    				 }
    				});
    		}else{
    			vm.result.push({"questiongroup":group,"question":question,"response":response})	
    		}           
            console.log(vm.result)
            console.log(JSON.stringify(vm.result))
        }
        
        vm.getGridAnswer = function(group,question,subquestion,response) {
        	function findsubquestion(item) { 
                return item.subquestion === subquestion;
            }
            if(vm.result.find(findsubquestion)!=null){
    			$.each(vm.result, function() {
    						if(this.subquestion==subquestion){
    							this.response=response
    						}
    						
    				});
    		}else{
    			vm.result.push({"questiongroup":group,"question":question,"subquestion":subquestion,"response":response});	
    		} 
         }
              
        vm.getmultiselect=function(group,question,subquestion,subquestioncode){
        	console.log(group);
        	console.log(question);
        	console.log(subquestion);
        	console.log(subquestioncode);
        	if(subquestioncode==true){
        		vm.result.push({"questiongroup":group,"question":question,"subquestion":subquestion,"response":vm.text});	       	
        	}else{
        		function findsubquestion(item) { 
                    return item.subquestion === subquestion;
                }
                if(vm.result.find(findsubquestion)!=null){
        			$.each(vm.result, function() {
        				if(this.subquestion==subquestion){
        				vm.result.splice(vm.result.indexOf(this), 1 );
        				}
        				});
          }
        }
        	console.log(JSON.stringify(vm.result))
        }
        
        vm.getmultiselecttext=function(group,question,subquestion){
        	console.log(group);
        	console.log(question);
        	console.log(subquestion);
        	console.log(vm.text);
        	
        }
        
        vm.getLargeText=function(group,question){
        	function findquestion(item) { 
                return item.question === question;
            }
            if(vm.result.find(findquestion)!=null){
    			$.each(vm.result, function() {
    				if (this.question == question) {
    			        this.response = vm.largeText;
    				 }
    				});
    		}else{
    			vm.result.push({"questiongroup":group,"question":question,"response":vm.largeText})	
    		}           
         }

        //development progress
        function xxx(){
        	 Response.responseByUserAndDate().$promise.then(function(response){
         		var response=JSON.parse(response.details);
         		console.log(response)
         		var array=[];
         		for(var i=0;i<response.questiongroups.length;i++){
        			 for(var j=0;j<response.questiongroups[i].questions.length;j++){     
        					}        				      
        		   } 
         	  });
        }
        
        xxx();
        
        vm.saveAnswer=function(action){  
      	   Response.responseByUserAndDate().$promise.then(function(response){
        		var response=JSON.parse(response.details);
        		
        	  });
      	   
        	console.log(action)
        	var questionnaire=$stateParams.id  
        	console.log(vm.result)
        	
        	var questiongroups = vm.result.reduce(function(groups, question){
           	var group = groups[question.questiongroup] || [];
           	  group.push({
           	    question: question.question,
           	    subquestion: question.subquestion,
           	    response: question.response
           	  });

           	  groups[question.questiongroup] = group;
           	  
           	  return groups;
           	}, {});

           	questiongroups = Object.keys(questiongroups).map(function (key)
           	  {
           		return {questiongroup: key, questions: questiongroups[key]}});

           	var object = {
           	  questiongroups: questiongroups
           	};

           	var result=JSON.stringify(object);
           	console.log(result);
           	
           	if(action==='save'){
        	$http.get('/adap_assessment/api/saveResponse/'+questionnaire+'/'+result)
        	.success(function (data) {
              });
           	}else if(action==='update'){
           		$http.get('/adap_assessment/api/updateResponse/'+questionnaire+'/'+result)
            	.success(function (data) {
              });	
           	}
       }
        
       
      //to hide and show update button
      Response.responseByUserAndQuestionnaire({id:$stateParams.id}).$promise.then(function(data) { 
        }, function(error) {
        	vm.showUpdate=true;
        	console.log("not found")
        });

      
    }
})();