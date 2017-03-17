(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('EditAttackTreeController', ScenarioController);

    ScenarioController.$inject = ['$scope', '$q', '$state', '$stateParams', '$location', 'AlertService', 'Scenario', 'Pathway', 'Scenariopathwaymbr', 'Pathwaypathwaymbr', 'Countermeasure', 'Pathwaycountermeasurembr', 'Recordtype','DTOptionsBuilder', 'DTColumnBuilder','Account'];

    function ScenarioController ($scope, $q, $state, $stateParams, $location, AlertService, Scenario, Pathway, Scenariopathwaymbr, Pathwaypathwaymbr, Countermeasure, Pathwaycountermeasurembr, Recordtype, DTOptionsBuilder, DTColumnBuilder, Account) {
        var vm = this;
        
        var line=false;
        var root=false;
        var edit=false;
        var scenariopathway=[];
        var pathwaypathway=[];
        var countermeasure=[];
        
        vm.scenariopathwaymbr={};
        vm.pathwaypathwaymbr={};
        vm.pathwaycountermeasurembr={}
        vm.scenarios=Scenario.query({});
        vm.pathways=Scenario.getPathways({});
        vm.scenario="";
        vm.scenarioId=$stateParams.id;

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({ el: $('#paper'), width: 1300, height: 900, gridSize: 10, model: graph,drawGrid:true,snapLinks:true,
        	interactive: function(cellView) {
                if (cellView.model instanceof joint.dia.Link) {
                    return { vertexAdd: false };
                }
                return true;
            }
        });        
        
                
        
          
        var x=220;
        var y=50;
        var step=1;
        var item=0;
        

        
        function excute(){
        	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
        		if (typeof rootNode.id != 'undefined'){
        			root=true;
        			edit=true;
                    var rootPathway=Scenario.getPathway({pathwayId :rootNode.pathway.id,scenarioId:$stateParams.id}, function(){
            	    var rect = new joint.shapes.tm.Actor({
    	             position: { x: x, y: y },
    	             size: { width: 100, height: 40 },
    	             attrs: { rect: { fill: "green" }, text: { text: rootNode.pathway.nameshort, fill: 'white' } }
    	              });
            	     rect.attr('id', rootNode.pathway.id)
            	     graph.addCells([rect]);
                 	 buildLevels(rootPathway,rect)
                  });
        		}else{
        			edit=false;
        		}
        		
            });
        }    
            
        function buildLevels(rootPathway,rect){
        		for(var i=0;i<rootPathway.length;i++){
            		(function(index) {
        			    setTimeout(function() {
        			    	var rect2 = new joint.shapes.tm.Actor({
        			            position: { x: x*item, y: y*3*step },
        			            size: { width: 100, height: 40 },
        			            attrs: { rect: { fill: rootPathway[index].color }, text: { text: rootPathway[index].pathwaypathwaymbr.childpathway.nameshort,'font-size': 14, fill: 'white' } }			    	
        			    	});        			    	
        			        var link = new joint.shapes.org.Arrow({
        			            source: { id: rect.id },
        			            target: { id: rect2.id },
        			            attrs: {
        			                },
        			                labels: [
        			                    { position: 0.5, attrs: { text: { text:  rootPathway[index].pathwaypathwaymbr.logicoperator, fill: 'black', 'font-family': 'sans-serif' }, rect: { stroke: '#AF104D', 'stroke-width': 20, rx: 5, ry: 5 } }}
        			                ]
        			        });
        			        rect2.attr('id', rootPathway[index].pathwaypathwaymbr.childpathway.id)
        			        graph.addCells([rect2, link]);
        			        for(var c=0; c < rootPathway[index].pathwaycountermeasurembrs.length;c++){
       			        	 var cmrect3= new joint.shapes.tm.Actor({
        		     	            position: { x: x*item, y: y*3*step+80 },
        		     	            size: { width: 150, height: 50 },
        		     	            attrs: { rect: { fill: 'yellow' }, text: { text: rootPathway[index].pathwaycountermeasurembrs[c].countermeasure.name, fill: 'black' } }
        		     	        });
        		            	 var cmlink3 = new joint.shapes.org.Arrow({
        					            source: { id: rect2.id },
        					            target: { id: cmrect3.id }
        		            	 });
        		            	    cmrect3.attr('id', rootPathway[index].pathwaycountermeasurembrs[c].countermeasure.id)
        					        graph.addCells([cmrect3,cmlink3]);
        					    }
        			        item++
        			        var child=Scenario.getPathway({pathwayId:rootPathway[index].pathwaypathwaymbr.childpathway.id,scenarioId:$stateParams.id}, function(){
        			        	buildLevels(child,rect2)
            			        step+=0.5;
        			        	item=1;
        			        });
          			    });
      			  })(i);
            	}
        }
        
        excute();
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        //drawing attack tree
        
        vm.line=function(){
     	 line=true;
        }
        
        function addPathway(id,name,recordtype){
        	if(root==true){
        	var color=Scenario.getColor({recordtype:recordtype}, function(){
            var rect = new joint.shapes.tm.Actor({
              position: { x: 50, y: 50 }, size: { width: 100, height: 40 },
              attrs: {
              	rect: { fill: color.content },
              	text: { text: name ,'font-size': 14, fill: "white" }
              }
          });
               rect.attr('id', id)
               rect.attr('type', "pathway")
      	       graph.addCells([ rect ]);
        	});
         }else{
        	 var pathway=Pathway.get({id : id}, function(){
           	 if(pathway.isrootnode==true){
        	 var color=Scenario.getColor({recordtype:recordtype}, function(){
                 var rect = new joint.shapes.tm.Actor({
                   position: { x: 50, y: 50 }, size: { width: 100, height: 40 },
                   attrs: {
                   	rect: { fill: color.content },
                   	text: { text: name, id: id,'font-size': 14, fill: "white" }
                   }
               });
                   rect.attr('id', id)
           	       graph.addCells([ rect ]);
             	});
        	     scenariopathway.push({"scenarioId": vm.scenario.id,"pathwayId": id});
        	     root=true;
        	  }
        	 });
          }
        
        }
         
        vm.addCountermeasure=function(id,name,recordtype){
        	if(vm.scenario.id != null){
        	vm.message="";
        	if(root==true){
        	var color=Scenario.getColor({recordtype:recordtype}, function(){
            var rect = new joint.shapes.tm.Actor({
              position: { x: 50, y: 50 }, size: { width: 100, height: 40 },
              attrs: {
              	rect: { fill: color.content },
              	text: { text: name ,'font-size': 14, fill: "white" }
              }
           });
               rect.attr('id', id)
               rect.attr('type', "countermeasure")
      	       graph.addCells([ rect ]);
        	});
         }
         }else{
        	 vm.message="You must select Scenario before building tree"
         }
        }
        
        
        paper.on('cell:pointerup', function(cellView, evt, x, y) {
        	if(line==true){
        	   graph.addCell(new joint.dia.Link({
               	   source: { id:cellView.model.id},
                   target: { x: x, y: y+70 },
               }));
        	}
        	line=false;
        });
        
        paper.on('cell:contextmenu', function(cellView, evt, x, y) { 
        	var nodeId=cellView.model.attributes.attrs;
        	if (typeof nodeId != 'undefined'){
        		var pathwayData=Pathway.get({id:nodeId.id},function(){
            		vm.pathwayData=pathwayData; 
            		$('#pathwaymodal').modal('show');
            	});
        	}else{
        		var source = graph.getCell(cellView.model.attributes.source.id);
            	var target = graph.getCell(cellView.model.attributes.target.id);
            	//var data=Scenario.getLineData({scenarioId: vm.scenario.id.id,parentId:source.attributes.attrs.id,childId:target.attributes.attrs.id},function(){
            	//	vm.lineData=data;
            	//	console.log(data)
            	 $('#linemodal').modal('show');
            //	});
          	}
        	
        	
        });
        
        graph.on('change:source change:target', function(link) {
            if (link.get('source').id && link.get('target').id) {
            	var source = graph.getCell(link.get('source'));
            	var target = graph.getCell(link.get('target'));
            	if(source.attributes.attrs.type == "countermeasure" || target.attributes.attrs.type == "countermeasure"){
            		countermeasure.push({"sourceId": source.attributes.attrs.id,"targetId": target.attributes.attrs.id});
            	}else{
            		pathwaypathway.push({"sourceId": source.attributes.attrs.id,"targetId": target.attributes.attrs.id});	
            	}
            }
        });
        		
        function cleanResponse(resp) {
            return JSON.parse(angular.toJson(resp));
        }
        
        
        vm.saveTree=function(){
        	Account.get().$promise.then(function(currentUser){
        	var lastmodifieddatetime = new Date();
        	var scenario=Scenario.get({id: $stateParams.id},function(){
        	});
        	
        	if(edit==false){
        	vm.scenariopathwaymbr.comment="comment";
        	vm.scenariopathwaymbr.status="Active";
        	vm.scenariopathwaymbr.lastmodifiedby=currentUser.data.lastmodifiedby;
        	vm.scenariopathwaymbr.lastmodifieddatetime=lastmodifieddatetime
        	vm.scenariopathwaymbr.domain=currentUser.data.domain;

        	
        	var pathway=Pathway.get({id:scenariopathway[0].pathwayId},function(){	
        	});
        	        	
        	$q.all([
        		scenario.$promise,
        		pathway.$promise
        	]).then(function() {
        		vm.thescenario = cleanResponse(scenario)
        		vm.scenariopathwaymbr.scenario=vm.thescenario;
        		
        		vm.pathway = cleanResponse(pathway)
        		vm.scenariopathwaymbr.pathway=vm.pathway; 
        		Scenariopathwaymbr.save(vm.scenariopathwaymbr)
        	 });
        	}
        	console.log(pathwaypathway);
        	for(var i=0;i<pathwaypathway.length;i++){
        	 	(function(item) {
    			    setTimeout(function() {
    	    vm.pathwaypathwaymbr.comment="comment";
        	vm.pathwaypathwaymbr.logicoperator="And";
        	vm.pathwaypathwaymbr.status="Active";
        	vm.pathwaypathwaymbr.lastmodifiedby=currentUser.data.lastmodifiedby;
        	vm.pathwaypathwaymbr.lastmodifieddatetime=lastmodifieddatetime;
        	vm.pathwaypathwaymbr.domain=currentUser.data.domain;
        	
        	var childPathway=Pathway.get({id:pathwaypathway[item].targetId},function(){
        	}); 
        	
        	var parentPathway=Pathway.get({id:pathwaypathway[item].sourceId},function(){
        	});        	
        	
        	$q.all([
        		scenario.$promise,
        		parentPathway.$promise,
        		childPathway.$promise
        	]).then(function() { 
        		
        		vm.scenario = cleanResponse(scenario)
        		vm.pathwaypathwaymbr.scenario=vm.scenario;
        		
        		vm.childPathway = cleanResponse(childPathway)
        		vm.pathwaypathwaymbr.childpathway=vm.childPathway; 
        		
        		vm.parentPathway = cleanResponse(parentPathway)
        		vm.pathwaypathwaymbr.parentpathway=vm.parentPathway; 
        		
        		Pathwaypathwaymbr.save(vm.pathwaypathwaymbr)
        	  });
    		 });
        	})(i);        	
          }
        	
        	
        	for(var j=0;j<countermeasure.length;j++){
        	 	(function(jitem) {
    			    setTimeout(function() {
    	    vm.pathwaycountermeasurembr.comment="comment";
        	vm.pathwaycountermeasurembr.status="Active";
        	vm.pathwaycountermeasurembr.lastmodifiedby="Ali";
        	vm.pathwaycountermeasurembr.lastmodifieddatetime=lastmodifieddatetime;
        	vm.pathwaycountermeasurembr.domain="DEMO";
        	
        	var pathwayNode=Pathway.get({id:countermeasure[jitem].sourceId},function(){
        	}); 
        	
        	var countermeasureNode=Countermeasure.get({id:countermeasure[jitem].targetId},function(){
        	});        	
        	
        	$q.all([
        		pathwayNode.$promise,
        		countermeasureNode.$promise
        	]).then(function() { 
        		
        		vm.pathwayNode = cleanResponse(pathwayNode)
        		vm.pathwaycountermeasurembr.pathway=vm.pathwayNode; 
        		
        		vm.countermeasureNode = cleanResponse(countermeasureNode)
        		vm.pathwaycountermeasurembr.countermeasure=vm.countermeasureNode; 
        		
        		Pathwaycountermeasurembr.save(vm.pathwaycountermeasurembr)
        	  });
    		 });
        	})(j);        	
          }
        	
         });
        }
       
      $scope.orderList = "id";
      
      vm.toPDF=function(){
    	  paper.print();
      }
      
      vm.savepathway=function(){
    	  Pathway.update(vm.pathwayData);
    	  $('#pathwaymodal').modal('hide');
      }
      
      vm.saveline=function(){
    	  Pathwaypathwaymbr.save(vm.lineData);
    	  $('#linemodal').modal('hide');
      }  
      
      vm.closepathwaymodal=function(){
    	  $('#pathwaymodal').modal('hide');
      }
      
      vm.closelinemodal=function(){
    	  $('#linemodal').modal('hide');
      }
              
      function loadPathways(){
      
       var goalPathways=Scenario.getPathwayByRecordtype({name:"Attack Goal"},function(){
    	 vm.goalPathways=[];
  	     for(var i=0;i<goalPathways.length;i++){
  	    	vm.goalPathways.push({"id":goalPathways[i].id,"nameshort":goalPathways[i].nameshort,"recordtype":goalPathways[i].recordtype.name});
  	     }
  	     
          vm.goalOptions = DTOptionsBuilder.newOptions()        
            .withOption('data', vm.goalPathways)
            .withOption('paging', false)
            .withOption('rowCallback', rowCallback)
            .withOption('bInfo', false);
          
          vm.goalColumns = [
        	  DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
        	  DTColumnBuilder.newColumn('nameshort').withTitle('Name'),
        	  DTColumnBuilder.newColumn('recordtype').withTitle('recordtype').notVisible(),
          ];
          vm.createGoal=function(){       
           createPathway(goalPathways[0].recordtype.id)
          }
      });  
      
      
      
      var vectorPathways=Scenario.getPathwayByRecordtype({name:"Attack Vector"},function(){
   	     
    	 vm.vectorPathways=[];
   	     for(var i=0;i<vectorPathways.length;i++){
   	    	vm.vectorPathways.push({"id":vectorPathways[i].id,"nameshort":vectorPathways[i].nameshort,"recordtype":vectorPathways[i].recordtype.name});
   	     }
   	     
           vm.vectorOptions = DTOptionsBuilder.newOptions()        
             .withOption('data', vm.vectorPathways)
             .withOption('paging', false)
             .withOption('rowCallback', rowCallback)
             .withOption('bInfo', false);
           
           vm.vectorColumns = [
        	  DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
         	  DTColumnBuilder.newColumn('nameshort').withTitle('Name'),
         	  DTColumnBuilder.newColumn('recordtype').withTitle('recordtype').notVisible(),
           ];
           vm.createGoal=function(){       
               createPathway(goalPathways[0].recordtype.id)
              }
       }); 
      
      var methodPathways=Scenario.getPathwayByRecordtype({name:"Attack Method"},function(){
    	     vm.methodPathways=[];
    	     for(var i=0;i<methodPathways.length;i++){
   	  	    	vm.methodPathways.push({"id":methodPathways[i].id,"nameshort":methodPathways[i].nameshort,"recordtype":methodPathways[i].recordtype.name});
    	     }
    	     
            vm.methodOptions = DTOptionsBuilder.newOptions()        
              .withOption('data', vm.methodPathways)
              .withOption('paging', false)
              .withOption('rowCallback', rowCallback)
              .withOption('bInfo', false);
            
            vm.methodColumns = [
              DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
          	  DTColumnBuilder.newColumn('nameshort').withTitle('Name'),
          	  DTColumnBuilder.newColumn('recordtype').withTitle('recordtype').notVisible(),
            ];
            vm.createGoal=function(){       
                createPathway(goalPathways[0].recordtype.id)
               }
        }); 
      
      
      var countermeasures=Countermeasure.query({},function(){
 	     vm.countermeasures=[];
 	     for(var i=0;i<countermeasures.length;i++){
	  	    	vm.countermeasures.push({"id":countermeasures[i].id,"nameshort":countermeasures[i].nameshort,"recordtype":countermeasures[i].recordtype.name});
 	     }
 	     
         vm.countermeasureOptions = DTOptionsBuilder.newOptions()        
           .withOption('data', vm.countermeasures)
           .withOption('paging', false)
           .withOption('rowCallback', rowCallback)
           .withOption('bInfo', false);
         
         vm.countermeasureColumns = [
           DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
       	  DTColumnBuilder.newColumn('nameshort').withTitle('Name'),
       	  DTColumnBuilder.newColumn('recordtype').withTitle('recordtype').notVisible(),
         ];
     }); 
      
    }
    
      loadPathways();
      
      function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
          $('td', nRow).unbind('click');
          $('td', nRow).bind('click', function() {
              $scope.$apply(function() {
            	  addPathway(aData.id,aData.nameshort,aData.recordtype)
              });
          });
          return nRow;
      }
      
      vm.openPathwayModal=function(recordtype){
    	   vm.recordtypeName=recordtype;
    	   vm.newPathway=null;
    	  $('#createPathwayModal').modal('show');
      }
      
      vm.createPathway=function(){
    	  Account.get().$promise.then(function(currentUser){
    		var lastmodifieddatetime = new Date();
           	vm.newPathway.domain=currentUser.data.domain
           	vm.newPathway.lastmodifiedby=currentUser.data.lastmodifiedby;
           	vm.newPathway.status="Active";
           	vm.newPathway.lastmodifieddatetime=lastmodifieddatetime;
           	vm.newPathway.domain=currentUser.data.domain
           	vm.newPathway.lastmodifiedby=currentUser.data.lastmodifiedby;
           	vm.newPathway.status="Active";
           	vm.newPathway.lastmodifieddatetime=lastmodifieddatetime;
           	
             var recordtype=Recordtype.recordtypeByName({name:vm.recordtypeName},function(){
           		
           	 });   	 
           	$q.all([
      		  recordtype.$promise   
             	 ]).then(function() {
             		vm.newPathway.recordtype=recordtype;
             		var save=Pathway.save(vm.newPathway);
             		$q.all([
                		  save.$promise   
                       	 ]).then(function() {
                       		loadPathways();
                  	     });
        	     }); 
           	
            $('#createPathwayModal').modal('hide');
             
    	  });
      }
      
      vm.closecreatepathwaymodal=function(){
    	  $('#createPathwayModal').modal('hide');  
      }
      
      vm.openCountermeasureModal=function(recordtype){
    	  console.log(recordtype)
   	   vm.recordtypeName=recordtype;
   	   vm.newCountermeasure=null;
   	  $('#createCountermeasueModal').modal('show');
     }
     
     vm.createCountermeasure=function(){
   	  Account.get().$promise.then(function(currentUser){
   		var lastmodifieddatetime = new Date();
          	vm.newCountermeasure.domain=currentUser.data.domain
          	vm.newCountermeasure.lastmodifiedby=currentUser.data.lastmodifiedby;
          	vm.newCountermeasure.status="Active";
          	vm.newCountermeasure.lastmodifieddatetime=lastmodifieddatetime;
          	vm.newCountermeasure.domain=currentUser.data.domain
          	vm.newCountermeasure.lastmodifiedby=currentUser.data.lastmodifiedby;
          	vm.newCountermeasure.status="Active";
          	vm.newCountermeasure.lastmodifieddatetime=lastmodifieddatetime;
          	
            var recordtype=Recordtype.recordtypeByName({name:vm.recordtypeName},function(){
          		
          	 });   	 
          	$q.all([
     		  recordtype.$promise   
            	 ]).then(function() {
            		vm.newCountermeasure.recordtype=recordtype;
            		var save=Countermeasure.save(vm.newCountermeasure);
            		$q.all([
               		  save.$promise   
                      	 ]).then(function() {
                      		loadPathways();
                 	     });
       	     }); 
          	
           $('#createCountermeasueModal').modal('hide');
            
   	  });
     }
     
     vm.closecreatecountermeasuremodal=function(){
   	  $('#createCountermeasueModal').modal('hide');  
     }
      
      
      vm.cancelupdate=function(){
    	  $location.path("/scenario/"+$stateParams.id);
      }
      
      
        paper.on('link:disconnect', function(evt, x, y) { 
    	    console.log("link:disconnect")
    	})
    	
       graph.on('remove', function(cell, collection, opt) { 
       
    	  if(cell.attributes.type === 'tm.Actor'){
           	  Scenario.removeRoot({scenarioId: $stateParams.id,pathwayId:cell.attributes.attrs.id})
    	  } 
    	   
    	  else if (cell.attributes.type === 'org.Arrow'){         		
    	    var source = graph.getCell(cell.attributes.source.id);
       	    var target = graph.getCell(cell.attributes.target.id);
       	    console.log(source.attributes.attrs.id);
       	    console.log(target.attributes.attrs.id); 
            Scenario.removeLine({scenarioId: $stateParams.id,parentId:source.attributes.attrs.id,childId:target.attributes.attrs.id})
          }
         })

    }
})();
