(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireResponseController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$http','$scope','$timeout','$rootScope', '$stateParams', 'entity', 'Questionnaire', 'Questiongroup','Question','Subquestion','Answer','Response','Conditions','Logicoperator'];

    function QuestionnaireDetailController($http,$scope,$timeout,$rootScope, $stateParams, entity, Questionnaire, Questiongroup, Question,Subquestion,Answer,Response,Conditions,Logicoperator) {
        var vm = this;
        vm.response=$stateParams.rId;
        vm.questionnaire = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:questionnaireUpdate', function(event, result) {
            vm.questionnaire = result;
        });
        $scope.$on('$destroy', unsubscribe);
       
        
        var questiongroup=[];
        vm.questiongroup=[];

        
        function loadQuestions () {
            Questiongroup.questiongroupsByQuestionnaire({id:$stateParams.id}).$promise.then(function(group){
           	questiongroup.push.apply(questiongroup,group);
               for(var i=0;i<group.length;i++){
               	(function(item) {
        			    setTimeout(function() {
         		        var grouptitle=group[item].title
                   	Question.questionsByQuestionGroupAndQuestionId({id:group[item].id}).$promise.then(function(question){
                   		group[item].question=[];
                	    for(var j=0;j<question.length;j++){ 
                		   (function(index) {
                			    setTimeout(function() {
                			    	group[item].question.push(question[index])
                			    	Subquestion.subquestionsByQuestion({id:question[index].id}).$promise.then(function(subquestion){
                        			   question[index].subquestion=subquestion; 
                                 	   Answer.answersByQuestion({id:question[index].id}).$promise.then(function(answer){
                                 		   question[index].answer=answer;
                                        });
                                 	   
                                 	   Response.get({id:$stateParams.rId}).$promise.then(function(data){
                                     		var response=JSON.parse(data.details);                                     		
                                		    
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
                	   getOldResponse();
                	   getRules();
                });
        	
        			    });  		
        			    
               	})(i);
               	
               }         
            });
           }
        
        var userResponse=[];
        var rules=[];
        var logicRules=[];
        
        function getOldResponse(){
        	 Response.get({id:$stateParams.rId}).$promise.then(function(response){
         		var response=JSON.parse(response.details);
         	    if(response!=null){
         		for(var i=0;i<response.questiongroups.length;i++){
         			
        			 for(var j=0;j<response.questiongroups[i].questions.length;j++){
        				 userResponse.push({"questiongroup":response.questiongroups[i].questiongroup,"question":response.questiongroups[i].questions[j].question,"subquestion":response.questiongroups[i].questions[j].subquestion,"response":response.questiongroups[i].questions[j].response})      		  
        				 loadQuestionById(response.questiongroups[i].questiongroup,response.questiongroups[i].questions[j].question)
        			 }        				      
        		   } 
         	    }
         	  });
        }
       
        loadQuestions();
        
       
 	   

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
            function findquestion(item) { 
                return item.question === question;
            }  
            
            Conditions.conditionByQuestion({id:question})
      	   .$promise.then(
      	      function(condition){
      	    	if(condition.operator == '>') {
   	             if(response  > condition.response){
   	            	if(rules.find(findquestion)!=null){
   	            	  $.each(rules, function() {
                		if(this.question==question){
      						this.output=true;
      						this.response=response;
                		}
      			    });
   	            	}else{
   	                  rules.push({"group":group,"question":question,"response":response,"output":true}) 
   	            	}
   	             }else{
   	            	if(rules.find(findquestion)!=null){
     	           	  $.each(rules, function() {
                		if(this.question==question){
      						this.output=false;
      						this.response=response;
                		}
      			    });
     	          	}else{
     	                 rules.push({"group":group,"question":question,"response":response,"output":false}) 
     	           }
   	             }
   	            }else if(condition.operator == '=') {
   	            	if(response  == condition.response){
   	   	            	if(rules.find(findquestion)!=null){
   	   	            	  $.each(rules, function() {
   	                		if(this.question==question){
   	      						this.output=true;
   	      						this.response=response;
   	                		}
   	      			    });
   	   	            	}else{
   	   	                  rules.push({"group":group,"question":question,"response":response,"output":true}) 
   	   	            	}
   	   	             }else{
   	   	            	if(rules.find(findquestion)!=null){
   	     	           	  $.each(rules, function() {
   	                		if(this.question==question){
   	      						this.output=false;
   	      						this.response=response;
   	                		}
   	      			    });
   	     	          	}else{
   	     	                 rules.push({"group":group,"question":question,"response":response,"output":false}) 
   	     	           }
   	   	             }
   	            } 	
      	    	Logicoperator.logicoperatorByQuestionnaire({id:$stateParams.id})
           	     .$promise.then(
           	      function(logicoperator){
           	    	  if(logicoperator.length != 0){
           	    		Logicoperator.logicoperatorByFirstquestionOrSecondquestion({id:question})
                  	     .$promise.then(
                  	      function(object){
                  	    	  if(object.length!=0){
                  	    		logicExcute(logicoperator,group,condition);
                  	    	  }else{
                  	    		var questionObject = findByKey(rules, 'question', question);
                       	    	if(questionObject.output){
                       	    		loadQuestionById(group,condition.displayedquestion.id);
                       	    	}else{
                       	    		var groupIndex = vm.questiongroup.findIndex(x => x.id==group)
                       	    		var questionIndex = vm.questiongroup[groupIndex].question.findIndex(x => x.id==condition.displayedquestion.id)
                               		if(groupIndex != -1 && questionIndex != -1){
                       	    		vm.questiongroup[groupIndex].question.splice(questionIndex,1)
                               		 }	   
                       	    	}
                  	    	  }
                  	      });
           	    	 
           	      }else{
           	    	var questionObject = findByKey(rules, 'question', question);
           	    	if(questionObject.output){
           	    		loadQuestionById(group,condition.displayedquestion.id);
           	    	}else{
           	    		var groupIndex = vm.questiongroup.findIndex(x => x.id==group)
           	    		var questionIndex = vm.questiongroup[index].question.findIndex(x => x.id==condition.displayedquestion.id)
                   		 vm.questiongroup[x].question.splice(questionIndex,1)   
           	    	}
           	      }
           	      }, function(error) {
           	      });
      	      });
        }
        
        vm.getGridAnswer = function(group,question,subquestion,response) {
        	console.log(group)
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
             
             Conditions.conditionBySubquestion({id:subquestion})
        	   .$promise.then(
        	      function(condition){
        	    	if(condition.operator == '=') {
     	             if(response  == condition.response){
     	            	if(rules.find(findsubquestion)!=null){
     	            	  $.each(rules, function() {
                  		if(this.subquestion==subquestion){
        						this.output=true;
        						this.response=response;
                  		}
        			    });
     	            	}else{
     	                  rules.push({"group":group,"question":question,"subquestion":subquestion,"response":response,"output":true}) 
     	            	}
     	             }else{
     	            	if(rules.find(findsubquestion)!=null){
       	           	    $.each(rules, function() {
                  		if(this.subquestion==subquestion){
        						this.output=false;
        						this.response=response;
                  		}
        			    });
       	          	}else{
       	                 rules.push({"group":group,"question":question,"subquestion":subquestion,"response":response,"output":false}) 
       	           }
     	             }
     	            }
        	    	Logicoperator.logicoperatorByQuestionnaire({id:$stateParams.id})
              	     .$promise.then(
              	      function(logicoperator){
              	    	 if(logicoperator.length != 0){
              	    	 logicExcute(logicoperator,group,condition)
              	      }else{
              	    	
              	      }
              	      }, function(error) {
              	      }); 	

        	      });
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
       	console.log(action); 
       	console.log(userResponse);
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
          		$http.get('/adap_assessment/api/updateResponse/'+$stateParams.id+'/'+$stateParams.rId+'/'+result)
           	.success(function (data) {
             });	
          	}
      }

        
       /**
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
      **/

     
     function loadQuestionById(groupId,questionId) {
      	Question.get({id:questionId}).$promise.then(function(question){
           		  Subquestion.subquestionsByQuestion({id:question.id}).$promise.then(function(subquestion){
           			   question.subquestion=subquestion; 
                    	   Answer.answersByQuestion({id:question.id}).$promise.then(function(answer){
                    		   question.answer=answer;
                           });
                    	   Response.get({id:$stateParams.rId}).$promise.then(function(data){
                        		var response=JSON.parse(data.details);
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
           		function findquestion(item) { 
   	                return item.id === questionId;
   	            }
           		
           		var index = vm.questiongroup.findIndex(x => x.id==question.questiongroup.id)
           		if(vm.questiongroup[index].question.find(findquestion)!=null){
           			
           		}else{
           		vm.questiongroup[index].question.push(question);
           		}
   });
 }      
     
     function findByKey(array, key, value) {
   	    for (var i = 0; i < array.length; i++) {
   	        if (array[i][key] === value) {
   	            return array[i];
   	        }
   	    }
   	    return null;
   	}
     
     
     
     function logicExcute(logicoperator,group,condition){
    	 var logicData=[];
    	 console.log(rules)
    	 for(var log=0;log<logicoperator.length;log++){
    		 logicData.push({"logicoperator":logicoperator[log].id,"output":false,"checked":false})	
	    		 if(logicoperator[log].operator=="AND"){
	    			if(logicoperator[log].firstquestion != null && logicoperator[log].secondquestion != null){
	    				var firstQuestion = findByKey(rules, 'question', logicoperator[log].firstquestion.id);
		    			var secondQuestion = findByKey(rules, 'question', logicoperator[log].secondquestion.id);
		    			if(firstQuestion.output && secondQuestion.output){	
		    				$.each(logicData, function() {
	    	    				if (this.logicoperator == logicoperator[log].id) {
	    	    			        this.output = true;
	    	    				 }
	    	    				});	
			    			}else{
			    			   }
		    			} 
	    			if(logicoperator[log].firstquestion != null && logicoperator[log].secondsubquestion != null){
	    				var firstQuestion = findByKey(rules, 'question', logicoperator[log].firstquestion.id);
	    				var secondSubquestion = findByKey(rules, 'subquestion', logicoperator[log].secondsubquestion.id);
	    				console.log(firstQuestion)
	    				console.log(secondSubquestion)
	    				if(firstQuestion != null && secondSubquestion != null){
	    				if(firstQuestion.output && secondSubquestion.output){	
	    					$.each(logicData, function() {
	    	    				if (this.logicoperator == logicoperator[log].id) {
	    	    			        this.output = true;
	    	    				 }
	    	    				});		
	  	    			}else{}}}
	    			if(logicoperator[log].firstsubquestion !=null && logicoperator[log].secondsubquestion != null){
	    				var firstSubquestion = findByKey(rules, 'subquestion', logicoperator[log].firstsubquestion.id);
		    			var secondSubquestion = findByKey(rules, 'subquestion', logicoperator[log].secondsubquestion.id);
		    			if(firstSubquestion.output && secondSubquestion.output){	
		    				$.each(logicData, function() {
	    	    				if (this.logicoperator == logicoperator[log].id) {
	    	    			        this.output = true;
	    	    				 }
	    	    				});		
		  	    		}else{}}
	    			checklogic(logicData,group,condition)
	    		 }
	    		       else if(logicoperator[log].operator=="OR"){
		    			if(logicoperator[log].firstquestion != null && logicoperator[log].secondquestion != null){
		    				var firstQuestion = findByKey(rules, 'question', logicoperator[log].firstquestion.id);
			    			var secondQuestion = findByKey(rules, 'question', logicoperator[log].secondquestion.id);			    			
			    			if(firstQuestion != null && secondQuestion != null){
			    				$.each(logicData, function() {
		    	    				if (this.logicoperator == logicoperator[log].id) {
		    	    					this.checked = true;
		    	    				 }
		    	    			});
			    				if(firstQuestion.output || secondQuestion.output){	
			    				  var object = findByKey(logicData, 'logicoperator', logicoperator[log].id);
			    				   $.each(logicData, function() {
			    	    				if (this.logicoperator == logicoperator[log].id) {
			    	    			        this.output = true;
			    	    				 }
			    	    				});}else{}}}
		    			if(logicoperator[log].firstquestion != null && logicoperator[log].secondsubquestion != null){
		    				var firstQuestion = findByKey(rules, 'question', logicoperator[log].firstquestion.id);
		    				var secondSubquestion = findByKey(rules, 'subquestion', logicoperator[log].secondsubquestion.id);
		    				
		    				if(firstQuestion != null && secondSubquestion != null){
		    					$.each(logicData, function() {
		    	    				if (this.logicoperator == logicoperator[log].id) {
		    	    					this.checked = true;
		    	    				 }
		    	    			});
		    					if(firstQuestion.output || secondSubquestion.output){		    					  
		    				      $.each(logicData, function() {
			    	    				if (this.logicoperator == logicoperator[log].id) {
			    	    					this.output = true;
			    	    				 }
			    	    		  });}else{}}}
		    			if(logicoperator[log].firstsubquestion != null && logicoperator[log].secondsubquestion != null){
		    				var firstSubquestion = findByKey(rules, 'subquestion', logicoperator[log].firstsubquestion.id);
			    			var secondSubquestion = findByKey(rules, 'subquestion', logicoperator[log].secondsubquestion.id);
			    			if(firstSubquestion != null && secondSubquestion !=null){
			    				$.each(logicData, function() {
		    	    				if (this.logicoperator == logicoperator[log].id) {
		    	    					this.checked = true;
		    	    				 }
		    	    			});
			    				if(firstSubquestion.output || secondSubquestion.output){	
			    				$.each(logicData, function() {
		    	    				if (this.logicoperator == logicoperator[log].id) {
		    	    					this.output = true;
		    	    				 }
		    	    			});
 			  	    			 }else{}}}
		    			
		    			
	    		       }	
    	 }   
    	 checkLogic(logicData,group,condition)
      }
     
     function checkLogic(logicData,group,condition){    	 
    	 var isCheckedTrue = logicData.every(function (e) {
             return e.checked === true;
         });
    	 
    	 if(isCheckedTrue){
    		     		     	    	
          var isOutputTrue = logicData.some(function (a) {
        	  return a.output === true;
          }); 
          
          if(isOutputTrue){
 			  loadQuestionById(group,condition.displayedquestion.id);
          }else{
			 Question.get({id:condition.displayedquestion.id}).$promise.then(function(question){
    			 var groupIndex = vm.questiongroup.findIndex(x => x.id == question.questiongroup.id)
        		 var questionIndex = vm.questiongroup[groupIndex].question.findIndex(x => x.id==condition.displayedquestion.id)
            		
        		   if(groupIndex != -1 && questionIndex != -1){
    	    		vm.questiongroup[groupIndex].question.splice(questionIndex,1)
            		}
    		 });
		   } 
          }      
     }
     
     
     function checklogic(logicData,group,condition){
    	 var isTrue = logicData.every(function (e) {
             return e.output === true;
         });

    	 if(isTrue){
    		 loadQuestionById(group,condition.displayedquestion.id);
    	 }else{
    		 
    		 
    		 Question.get({id:condition.displayedquestion.id}).$promise.then(function(question){
    			 var groupIndex = vm.questiongroup.findIndex(x => x.id == question.questiongroup.id)
        		 var questionIndex = vm.questiongroup[groupIndex].question.findIndex(x => x.id==condition.displayedquestion.id)
            		
        		   if(groupIndex != -1 && questionIndex != -1){
    	    		vm.questiongroup[groupIndex].question.splice(questionIndex,1)
            		}
    		 });
    		 
    		 
    	 }
     }
     

     
     function getRules(){
    	 Response.get({id:$stateParams.rId}).$promise.then(function(response){ 		 
     		var response=JSON.parse(response.details);
     	    if(response!=null){
     		for(var i=0;i<response.questiongroups.length;i++){	
     			(function(responseItem) {
    			    setTimeout(function() {
    			 for(var j=0;j<response.questiongroups[responseItem].questions.length;j++){
    				 (function(questionItem) {
    	    			    setTimeout(function() {
    	    			    	function findquestion(item) { 
    	    		                 return item.question === response.questiongroups[responseItem].questions[questionItem].question;
    	    		             }
    				 Conditions.conditionByQuestion({id:response.questiongroups[responseItem].questions[questionItem].question})
    		      	   .$promise.then(
    		      	      function(condition){
    		      	    	if(condition.operator == '>') {
    		      	    		console.log(response.questiongroups[responseItem].questions[questionItem].response)
    		   	             if(response.questiongroups[responseItem].questions[questionItem].response > condition.response){	
    		   	            	if(rules.find(findquestion)!=null){

		   	   	            	}else{
	    		   	                  rules.push({"group":response.questiongroups[responseItem].questiongroup,"question":response.questiongroups[responseItem].questions[questionItem].question,"response":response.questiongroups[responseItem].questions[questionItem].response,"output":true}) 
		   	   	            	}    		   	            
    		   	              }else{  		   	            	
    		   	             }
    		   	            }else if(condition.operator == '=') {
    		   	            	if(response.questiongroups[responseItem].questions[questionItem].response  == condition.response){
    		   	   	            	if(rules.find(findquestion)!=null){

    		   	   	            	}else{
    	    		   	                  rules.push({"group":response.questiongroups[responseItem].questiongroup,"question":response.questiongroups[responseItem].questions[questionItem].question,"response":response.questiongroups[responseItem].questions[questionItem].response,"output":true}) 
    		   	   	            	}
    		   	   	             }else{
    		   	   	            	if(rules.find(findquestion)!=null){
    		   	     	          	}else{
    	    		   	                  rules.push({"group":response.questiongroups[responseItem].questiongroup,"question":response.questiongroups[responseItem].questions[questionItem].question,"response":response.questiongroups[responseItem].questions[questionItem].response,"output":false}) 
    		   	     	           }
    		   	   	            	
    		   	   	             }
    		   	            }
    		      	    	
    		      	      });
    				 if(response.questiongroups[responseItem].questions[questionItem].subquestion!=null){
    				 Conditions.conditionBySubquestion({id:response.questiongroups[responseItem].questions[questionItem].subquestion})
    	        	   .$promise.then(
    	        	      function(condition){
    	        	    	  function findsubquestion(item) { 
    	                          return item.subquestion === response.questiongroups[responseItem].questions[questionItem].subquestion;
    	                      }
    	        	    	if(condition.operator == '=') {
    	     	             if(response.questiongroups[responseItem].questions[questionItem].response  == condition.response){
    	     	            	if(rules.find(findsubquestion)!=null){

    	     	            	}else{
    	     	                  rules.push({"group":response.questiongroups[responseItem].questiongroup,"question":response.questiongroups[responseItem].questions[questionItem].question,"subquestion":response.questiongroups[responseItem].questions[questionItem].subquestion,"response":response.questiongroups[responseItem].questions[questionItem].response,"output":true}) 
    	     	            	}
    	     	             }
    	     	            }
    	        	    	console.log(rules)
    	        	      });
    				 }
    	    			    });
    	     			})(j);
    			 } 
    			    });   			    
     			})(i);
    		   
     		}
     	    }
     	   
     	  });
    }
     
     
     
     
    }
})();