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
        var scenariopathwayCoordinates=[];
        var pathwaypathwayCoordinates=[];
        var countermeasureCoordinates=[];
        
        vm.scenariopathwaymbr={};
        vm.pathwaypathwaymbr={};
        vm.pathwaycountermeasurembr={}
        vm.scenarios=Scenario.query({});
        vm.pathways=Scenario.getPathways({});
        vm.scenario="";
        vm.message="";
        vm.scenarioId=$stateParams.id;

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({ width: 1300, height: 1000, gridSize: 10, model: graph,drawGrid:true,
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
        

        var paperScroller = new joint.ui.PaperScroller({
            paper: paper
        });

        $('#paper').append(paperScroller.render().el);
        
        var snaplines = new joint.ui.Snaplines({ paper: paper })
        snaplines.startListening()
        
        
        
        function excute(){
        	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
        		if (typeof rootNode.id != 'undefined'){
        			root=true;
        			edit=true;
                    var rootPathway=Scenario.getPathway({pathwayId :rootNode.pathway.id,scenarioId:$stateParams.id}, function(){
            	    var rect = new joint.shapes.tm.Actor({
    	             position: { x: rootNode.xcoordinate, y: rootNode.ycoordinate },
    	             size: { width: 100, height: 40 },
    	             attrs: { rect: { fill: "green" }, text: { text: rootNode.pathway.nameshort, fill: 'white' } }
    	              });
            	     rect.attr('id', rootNode.pathway.id)
            	     rect.attr('isroot', true)
            	     console.log(rootPathway)
            	     console.log(rootPathway.length)
            	     
            	     if(rootPathway.length > 0){
              	     rect.attr('instance', rootPathway[0].pathwaypathwaymbr.childInstance)
            	     }else{
                  	     rect.attr('instance', rect.id)
            	     }
            	     graph.addCells([rect]);
                     scenariopathwayCoordinates.push({"scenarioId": $stateParams.id,"pathwayId": rootNode.pathway.id,"xcoordinate":rootNode.xcoordinate,"ycoordinate":rootNode.ycoordinate});
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
        			            position: { x: rootPathway[index].pathwaypathwaymbr.xcoordinate, y: rootPathway[index].pathwaypathwaymbr.ycoordinate},
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
        			        rect2.attr('type', "pathway")
        			        rect2.attr('pathwaypathwaymbr',rootPathway[index].pathwaypathwaymbr.id)
        			        rect2.attr('recordtype', rootPathway[index].pathwaypathwaymbr.childpathway.recordtype.name)
        			        rect2.attr('instance', rootPathway[index].pathwaypathwaymbr.childInstance)
        			        graph.addCells([rect2, link]);
                    		pathwaypathwayCoordinates.push({"id": rootPathway[index].pathwaypathwaymbr.id,"sourceId": rect.attributes.attrs.id,"targetId": rect2.attributes.attrs.id,"xcoordinate":rect2.attributes.position.x,"ycoordinate":rect2.attributes.position.y});	
                    		for(var c=0; c < rootPathway[index].pathwaycountermeasurembrs.length;c++){
       			        	 var cmrect3= new joint.shapes.tm.Actor({
        		     	            position: { x: rootPathway[index].pathwaycountermeasurembrs[c].xcoordinate, y: rootPathway[index].pathwaycountermeasurembrs[c].ycoordinate },
        		     	            size: { width: 100, height: 40 },
        		     	            attrs: { rect: { fill: 'yellow' }, text: { text: rootPathway[index].pathwaycountermeasurembrs[c].countermeasure.nameshort, fill: 'black' } }
        		     	        });
        		            	 var cmlink3 = new joint.shapes.org.Arrow({
        					            source: { id: rect2.id },
        					            target: { id: cmrect3.id }
        		            	 });
        		            	    cmrect3.attr('id', rootPathway[index].pathwaycountermeasurembrs[c].countermeasure.id)
        					        cmrect3.attr('type', "countermeasure")
        					        cmrect3.attr('pathwaycountermeasurembr', rootPathway[index].pathwaycountermeasurembrs[c].id)
        		            	    cmrect3.attr('instance', rootPathway[index].pathwaycountermeasurembrs[c].childInstance)
        					        graph.addCells([cmrect3,cmlink3]);
        		            	    countermeasureCoordinates.push({id:rootPathway[index].pathwaycountermeasurembrs[c].id,"sourceId": rect2.attributes.attrs.id,"targetId": cmrect3.attributes.attrs.id,"xcoordinate":cmrect3.attributes.position.x,"ycoordinate":cmrect3.attributes.position.y});	
                    		}
        			        item++
        			        var child=Scenario.getPathwayInstnace({pathwayId:rootPathway[index].pathwaypathwaymbr.childpathway.id,scenarioId:$stateParams.id,parentInstance:rootPathway[index].pathwaypathwaymbr.childInstance}, function(){
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
               rect.attr('recordtype', recordtype)
      	       graph.addCells([ rect ]);
               rect.attr('instance', rect.id)
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
                 var dateInInteger=Date.parse(new Date());	
             	var instance=dateInInteger/(rect.attributes.position.x*rect.attributes.position.y);
             		
                   rect.attr('id', id)
                   rect.attr('isroot', true)
                   rect.attr('recordtype', recordtype)
           	       graph.addCells([ rect ]);
                   rect.attr('instance', rect.id)
                   scenariopathway.push({"scenarioId": $stateParams.id,"pathwayId": id,"xcoordinate":rect.attributes.position.x,"ycoordinate":rect.attributes.position.y});
             	});
        	     
        	     root=true;
        	  }
        	 });
          }
        
        }
         
        function addCountermeasure(id,name,recordtype){
        	if(root==true){
        	var color=Scenario.getColor({recordtype:recordtype}, function(){
            var rect = new joint.shapes.tm.Actor({
              position: { x: 50, y: 50 }, size: { width: 100, height: 40 },
              attrs: {
              	rect: { fill: color.content },
              	text: { text: name ,'font-size': 14, fill: "black" }
              }
           });
               rect.attr('id', id)
               rect.attr('type', "countermeasure")
      	       graph.addCells([ rect ]);
               rect.attr('instance', rect.id)
        	});
         }
         
        }
        
        paper.on('cell:pointerup', function(cellView, evt, x, y) {
        	if (cellView.model.attributes.type === 'tm.Actor'){
        	if(cellView.model.attributes.attrs.isroot==true){
        		$.each(scenariopathway, function() {
    					this.xcoordinate = cellView._dx;
    					this.ycoordinate = cellView._dy;
    			  });
        		$.each(scenariopathwayCoordinates, function() {
					this.xcoordinate = cellView._dx;
					this.ycoordinate = cellView._dy;
			      });
        	}else{
        	  $.each(pathwaypathway, function() {
				if (this.childInstance == cellView.model.id) {
					this.xcoordinate = cellView._dx;
					this.ycoordinate = cellView._dy;
				 }
			  });
        	  $.each(countermeasure, function() {
  				if (this.childInstance == cellView.model.id) {
  					this.xcoordinate = cellView._dx;
  					this.ycoordinate = cellView._dy;
  				 }
  			  });
  			   $.each(countermeasureCoordinates, function() {
  				if (this.id == cellView.model.attributes.attrs.pathwaycountermeasurembr) {
  					this.xcoordinate = cellView._dx;
  					this.ycoordinate = cellView._dy;
  				 }
  			  });
  			  $.each(pathwaypathwayCoordinates, function() {
  				if (this.id == cellView.model.attributes.attrs.pathwaypathwaymbr) {
  					this.xcoordinate = cellView._dx;
  					this.ycoordinate = cellView._dy;
  				 }
  			  });
        	 }
        	}
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
        	if(cellView.model.attributes.type === 'tm.Actor'){
        		var pathwayData=Pathway.get({id:nodeId.id},function(){
            		vm.pathwayData=pathwayData; 
            		$('#pathwaymodal').modal('show');
            	});
        	}else if (cellView.model.attributes.type === 'org.Arrow'){ 
        		var source = graph.getCell(cellView.model.attributes.source.id);
            	var target = graph.getCell(cellView.model.attributes.target.id);
            	var data=Scenario.getLineData({scenarioId: $stateParams.id,parentId:source.attributes.attrs.id,childId:target.attributes.attrs.id},function(){
            		vm.lineData=data;
            		vm.lineData.linkId=cellView.model.id;
            	 $('#linemodal').modal('show');
            	});
          	}
        });
        
        graph.on('change:source change:target', function(link) {
            if (link.get('source').id && link.get('target').id) {
            	var source = graph.getCell(link.get('source'));
            	var target = graph.getCell(link.get('target'));
            	console.log(source)
            	console.log(target)
            	if(source.attributes.attrs.type == "countermeasure" || target.attributes.attrs.type == "countermeasure"){
            		if(source.attributes.attrs.recordtype ==  "Attack Method"){
                		countermeasure.push({"sourceId": source.attributes.attrs.id,"targetId": target.attributes.attrs.id,"xcoordinate":target.attributes.position.x,"ycoordinate":target.attributes.position.y,"parentInstance":source.attributes.attrs.instance,childInstance:target.attributes.attrs.instance});            	    	
            		}else{
            	    	vm.message="Must Add Countermeasure To Attach Method";
            	    }
            	}else{
            		pathwaypathway.push({"sourceId": source.attributes.attrs.id,"targetId": target.attributes.attrs.id,"xcoordinate":target.attributes.position.x,"ycoordinate":target.attributes.position.y,"parentInstance":source.attributes.attrs.instance,childInstance:target.attributes.attrs.instance});	
            	}
            }
        });
        
        function cleanResponse(resp) {
            return JSON.parse(angular.toJson(resp));
        }
        
        
        vm.saveTree=function(){        	
        	//update scenario pathway Coordinates
        	for(var spc=0;spc< scenariopathwayCoordinates.length;spc++){
        		(function(spcitem) {
    			    setTimeout(function() {
        	        var object=Scenario.getRoot({id: $stateParams.id},function(){
        	          object.xcoordinate=scenariopathwayCoordinates[spcitem].xcoordinate;
        	          object.ycoordinate=scenariopathwayCoordinates[spcitem].ycoordinate;
        	          Scenariopathwaymbr.update(object);
                   });
    	      });
             })(spc);
        	}
        	
        	//update pathway pathway Coordinates
        	for(var ppc=0;ppc< pathwaypathwayCoordinates.length;ppc++){
        		(function(ppcitem) {
    			    setTimeout(function() {
        	        var object=Pathwaypathwaymbr.get({id:pathwaypathwayCoordinates[ppcitem].id},function(){
        	          object.xcoordinate=pathwaypathwayCoordinates[ppcitem].xcoordinate;
        	          object.ycoordinate=pathwaypathwayCoordinates[ppcitem].ycoordinate;
        	          Pathwaypathwaymbr.update(object);
                   });
    	      });
             })(ppc);
        	}
        	
        	//update countermeasure Coordinates
        	for(var cc=0;cc< countermeasureCoordinates.length;cc++){
        		(function(ccitem) {
    			    setTimeout(function() {
        	        var object=Pathwaycountermeasurembr.get({id:countermeasureCoordinates[ccitem].id},function(){
        	          object.xcoordinate=countermeasureCoordinates[ccitem].xcoordinate;
        	          object.ycoordinate=countermeasureCoordinates[ccitem].ycoordinate;
        	          Pathwaycountermeasurembr.update(object);
                   });
    	      });
             })(cc);
        	}
        	
        	
        	Account.get().$promise.then(function(currentUser){
        	var lastmodifieddatetime = new Date();
        	var scenario=Scenario.get({id: $stateParams.id},function(){
        	});
        	
        	if(edit==false){
        	vm.scenariopathwaymbr.comment="comment";
        	vm.scenariopathwaymbr.xcoordinate=scenariopathway[0].xcoordinate;
        	vm.scenariopathwaymbr.ycoordinate=scenariopathway[0].ycoordinate;
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
        		var saveNewScenario=Scenariopathwaymbr.save(vm.scenariopathwaymbr) 
        		$q.all([
        			saveNewScenario.$promise
            	]).then(function() { 
            		scenariopathway=[];
            	});
        	 });
        	}
        	
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
        		
        		vm.pathwaypathwaymbr.xcoordinate=pathwaypathway[item].xcoordinate;
            	vm.pathwaypathwaymbr.ycoordinate=pathwaypathway[item].ycoordinate;
            	vm.pathwaypathwaymbr.parentInstance=pathwaypathway[item].parentInstance;
            	vm.pathwaypathwaymbr.childInstance=pathwaypathway[item].childInstance;
        		vm.scenario = cleanResponse(scenario)
        		vm.pathwaypathwaymbr.scenario=vm.scenario;
        		
        		vm.childPathway = cleanResponse(childPathway)
        		vm.pathwaypathwaymbr.childpathway=vm.childPathway; 
        		
        		vm.parentPathway = cleanResponse(parentPathway)
        		vm.pathwaypathwaymbr.parentpathway=vm.parentPathway; 
        		
        		var saveNewPathway=Pathwaypathwaymbr.save(vm.pathwaypathwaymbr);
        		$q.all([
        			saveNewPathway.$promise
            	]).then(function() { 
                     pathwaypathway=[];
            	});
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
        		
        		vm.pathwaycountermeasurembr.parentInstance=countermeasure[jitem].parentInstance;
            	vm.pathwaycountermeasurembr.childInstance=countermeasure[jitem].childInstance;
     
        		vm.pathwaycountermeasurembr.xcoordinate=countermeasure[jitem].xcoordinate;
            	vm.pathwaycountermeasurembr.ycoordinate=countermeasure[jitem].ycoordinate;
            	
        		vm.scenario = cleanResponse(scenario)
        		vm.pathwaycountermeasurembr.scenario=vm.scenario;
        		
        		vm.pathwayNode = cleanResponse(pathwayNode)
        		vm.pathwaycountermeasurembr.pathway=vm.pathwayNode; 
        		
        		vm.countermeasureNode = cleanResponse(countermeasureNode)
        		vm.pathwaycountermeasurembr.countermeasure=vm.countermeasureNode; 
        		
        		var saveNewPathwaycounter=Pathwaycountermeasurembr.save(vm.pathwaycountermeasurembr);
        		$q.all([
        			saveNewPathwaycounter.$promise
            	]).then(function() { 
            		countermeasure=[];
            	});
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
    	  Pathwaypathwaymbr.update(vm.lineData);
    	  var link=graph.getCell(vm.lineData.linkId)
    	      link.label(0, {
                  position: .5,
                  attrs: {
                     rect: { fill: 'white' },
                     text: { fill: 'blue', text: vm.lineData.logicoperator }
           }
         });
    	  $('#linemodal').modal('hide');
      }  
      
      vm.closepathwaymodal=function(){
    	  $('#pathwaymodal').modal('hide');
      }
      
      vm.closelinemodal=function(){
    	  $('#linemodal').modal('hide');
      }
              
      function loadPathways(){
      
       var goalPathways=Scenario.getPathwayByRecordtype({name:"Attack Goal",isrootnode:true},function(){
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
       
       
       var intermediateGoalPathways=Scenario.getPathwayByRecordtype({name:"Attack Goal",isrootnode:false},function(){
      	 vm.intermediateGoalPathways=[];
    	     for(var i=0;i<intermediateGoalPathways.length;i++){
    	    	vm.intermediateGoalPathways.push({"id":intermediateGoalPathways[i].id,"nameshort":intermediateGoalPathways[i].nameshort,"recordtype":intermediateGoalPathways[i].recordtype.name});
    	     }
    	     
            vm.intermediateGoalOptions = DTOptionsBuilder.newOptions()        
              .withOption('data', vm.intermediateGoalPathways)
              .withOption('paging', false)
              .withOption('rowCallback', rowCallback)
              .withOption('bInfo', false);
            
            vm.intermediateGoalColumns = [
          	  DTColumnBuilder.newColumn('id').withTitle('id').notVisible(),
          	  DTColumnBuilder.newColumn('nameshort').withTitle('Name'),
          	  DTColumnBuilder.newColumn('recordtype').withTitle('recordtype').notVisible(),
            ];
            vm.createintermediateGoal=function(){       
             createPathway(intermediateGoalPathways[0].recordtype.id)
            }
        });  
      
      
      
      var vectorPathways=Scenario.getPathwayByRecordtype({name:"Attack Vector",isrootnode:false},function(){
   	     
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
      
      var methodPathways=Scenario.getPathwayByRecordtype({name:"Attack Method",isrootnode:false},function(){
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
            	  if(aData.recordtype==='Counter Measure Policy'){
            		  addCountermeasure(aData.id,aData.nameshort,aData.recordtype)  
            	  }else{
            	    addPathway(aData.id,aData.nameshort,aData.recordtype)
            	  }
              });
          });
          return nRow;
      }
      
      vm.openPathwayModal=function(recordtype,isrootnode){
    	   vm.recordtypeName=recordtype;
    	   vm.newPathway={};
    	   vm.newPathway.isrootnode=isrootnode; 
    	  $('#createPathwayModal').modal('show');
      }
      
      vm.createPathway=function(){
    	  Account.get().$promise.then(function(currentUser){
    		var lastmodifieddatetime = new Date();
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
       	 if(source.attributes.attrs.type == "countermeasure" || target.attributes.attrs.type == "countermeasure"){
             Scenario.removePathwayCountermeasure({scenarioId: $stateParams.id,pathwayId:source.attributes.attrs.id,countermeasureId:target.attributes.attrs.id})
     	}else{
            Scenario.removeLine({scenarioId: $stateParams.id,parentId:source.attributes.attrs.id,childId:target.attributes.attrs.id})
     	}
          }
         })

    }
})();
