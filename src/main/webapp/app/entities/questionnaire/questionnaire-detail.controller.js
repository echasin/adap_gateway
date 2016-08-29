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

        
        vm.saveAnswer=function(){  
        	var questionnaire=$stateParams.id          	
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
           	
        	$http.get('/adap_assessment/api/saveResponse/'+questionnaire+'/'+result)
        	.success(function (data) {
              });	
           	
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
      
      
    }
})();