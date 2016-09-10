(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDetailController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$http','$scope','$timeout','$rootScope', '$stateParams', 'entity', 'Questionnaire', 'Questiongroup','Question','Subquestion','Answer','Response','Conditions'];

    function QuestionnaireDetailController($http,$scope,$timeout,$rootScope, $stateParams, entity, Questionnaire, Questiongroup, Question,Subquestion,Answer,Response,Conditions) {
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
            Questiongroup.questiongroupsByQuestionnaire({id:$stateParams.id}).$promise.then(function(group){
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
                                 	   Response.responseByQuestionnaire({id:$stateParams.id}).$promise.then(function(data){
                                     		var response=JSON.parse(data.details);
                                     		vm.response=data.id;
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
                	   console.log(vm.questiongroup[0].question);
                	  
                   	});
        			   });
      			  })(i);
               }
             
            });
           }
        
        
        var userResponse=[];

        function getOldResponse(){
        	 Response.responseByQuestionnaire({id:$stateParams.id}).$promise.then(function(response){
         		var response=JSON.parse(response.details);
         		console.log(response)
         	    
         		for(var i=0;i<response.questiongroups.length;i++){
        			 for(var j=0;j<response.questiongroups[i].questions.length;j++){
        				 userResponse.push({"questiongroup":response.questiongroups[i].questiongroup,"question":response.questiongroups[i].questions[j].question,"subquestion":response.questiongroups[i].questions[j].subquestion,"response":response.questiongroups[i].questions[j].response})
        		     }        				      
        		   } 
         	  });
        }
        getOldResponse();
        
        vm.getChoiceAnswer = function(group,question,response){
        	function findquestion(item) { 
                return item.question === question;
            }
            if(userResponse.find(findquestion)!=null){
    			$.each(userResponse, function() {
    				if (this.question == question) {
    			        this.response = response;
    				 }
    				});
    		}else{
    			userResponse.push({"questiongroup":group,"question":question,"response":response})	
    		}           
            Question.updateQuestion({id:question});
            Conditions.conditionByQuestion({id:question}).$promise.then(function(condition){	
                       
            if(condition.operator == '>') {
        	    if(response  > condition.response){
            		loadQuestionById(group,condition.displayedquestion.id);	
            	}     	    
        	} else if(condition.operator == '<'){
        		 if(response  < condition.response){
        			 console.log("Other")
        		 } 
        	} 
            
            
            });
            
        }
        
        
       
        
        vm.getGridAnswer = function(group,question,subquestion,response) {
        	function findsubquestion(item) { 
                return item.subquestion === subquestion;
            }
             if(userResponse.find(findsubquestion)!=null){
    			$.each(userResponse, function() {
					if(this.subquestion==subquestion){
						this.response=response
					}
					
			});
	        }else{
	        	userResponse.push({"questiongroup":group,"question":question,"subquestion":subquestion,"response":response});	
    		} 
         }
              
        vm.getmultiselect=function(group,question,subquestion,subquestioncode){
        	if(subquestioncode==true){
        		userResponse.push({"questiongroup":group,"question":question,"subquestion":subquestion,"response":vm.text});	       	
        	}else{
        		function findsubquestion(item) { 
                    return item.subquestion === subquestion;
                }
                if(userResponse.find(findsubquestion)!=null){
        			$.each(userResponse, function() {
        				if(this.subquestion==subquestion){
        					userResponse.splice(userResponse.indexOf(this), 1 );
        				}
        				});
          }
        }
       }
        
        vm.getmultiselecttext=function(group,question,subquestion,text){
        	function findsubquestion(item) { 
                return item.subquestion === subquestion;
            }
             if(userResponse.find(findsubquestion)!=null){
    			$.each(userResponse, function() {
					if(this.subquestion==subquestion){
						this.response=text
					}
					
			});
	        }
        }
        
        vm.getLargeText=function(group,question,largeText){
        	function findquestion(item) { 
                return item.question === question;
            }
            if(userResponse.find(findquestion)!=null){
    			$.each(userResponse, function() {
    				if (this.question == question) {
    			        this.response = largeText;
    				 }
    				});
    		}else{
    			userResponse.push({"questiongroup":group,"question":question,"response":largeText})	
    		} 
         }

        
     vm.saveAnswer=function(action){  
     	   
       	console.log(action)
       	var questionnaire=$stateParams.id  
       	console.log(vm.result)
       	
       	var questiongroups = userResponse.reduce(function(groups, question){
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

        
       
      Response.responseByUserAndQuestionnaire({id:$stateParams.id}).$promise.then(function(data) { 
         console.log(data.length)
    	  if(data.length>0){
      	   vm.showUpdate=false;
         }else{
      	   vm.showUpdate=true;
         }  
       }, function(error) {
       	console.log("not found")
      });
      
      
      function loadQuestionById(groupId,questionId) {
                 	Question.get({id:questionId}).$promise.then(function(question){
                      		  Subquestion.subquestionsByQuestion({id:question.id}).$promise.then(function(subquestion){
                      			   question.subquestion=subquestion; 
                               	   Answer.answersByQuestion({id:question.id}).$promise.then(function(answer){
                               		   question.answer=answer;
                                      });
                               	   Response.responseByQuestionnaire({id:$stateParams.id}).$promise.then(function(data){
                                   		var response=JSON.parse(data.details);
                                   		vm.response=data.id;
                              		    for(var i=0;i<response.questiongroups.length;i++){
                                   			 for(var j=0;j<response.questiongroups[i].questions.length;j++){                                     				 
                                   				if(response.questiongroups[i].questions[j].question==question.id){
                                   					for(var w=0;w<question.subquestion.length;w++){
                                   						if(response.questiongroups[i].questions[j].subquestion==question.subquestion[w].id){
                                   						question.subquestion[w].response=response.questiongroups[i].questions[j].response;
                                   						}
                                   					}
                                   					question.response=response.questiongroups[i].questions[j].response;
                                   				}      
                                   			 }
                                   		   }                               		    
                                   	  });                               	  
                          	     });
                      		 console.log(vm.questiongroup.length);
                      		function findquestion(item) { 
              	                return item.id === questionId;
              	            }
                      		 for(var x=0;x<vm.questiongroup.length;x++){
                      			 if(vm.questiongroup[x].id=groupId){
                      	            if(vm.questiongroup[x].question.find(findquestion)!=null){
                      	    			console.log("found found found found found found found found found found found found")
                      	    		}else{
                      	    			vm.questiongroup[x].question.push(question);
                      	    		}
                      			 }
                      		 }
                      		 console.log(vm.questiongroup); 
              });
             }
      
      
    }
})();