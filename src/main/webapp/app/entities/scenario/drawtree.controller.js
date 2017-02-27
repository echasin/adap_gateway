(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('DrawtreeController', ScenarioController);

    ScenarioController.$inject = ['$scope', '$q', '$state', 'AlertService', 'Scenario', 'Pathway', 'Scenariopathwaymbr', 'Pathwaypathwaymbr', 'Countermeasure', 'Pathwaycountermeasurembr'];

    function ScenarioController ($scope, $q, $state, AlertService, Scenario, Pathway, Scenariopathwaymbr, Pathwaypathwaymbr, Countermeasure, Pathwaycountermeasurembr) {
        var vm = this;
        
        var line=false;
        var root=false;
        var scenariopathway=[];
        var pathwaypathway=[];
        var countermeasure=[];
        vm.scenariopathwaymbr={};
        vm.pathwaypathwaymbr={};
        vm.pathwaycountermeasurembr={}
        vm.scenarios=Scenario.query({});
        vm.pathways=Scenario.getPathways({});
        vm.countermeasures=Countermeasure.query({});
        vm.scenario="";

        var graph = new joint.dia.Graph;
        var paper = new joint.dia.Paper({ el: $('#paper'), width: 1050, height: 900, gridSize: 10, model: graph,drawGrid:true,snapLinks:true,
        	interactive: function(cellView) {
                if (cellView.model instanceof joint.dia.Link) {
                    return { vertexAdd: false };
                }
                return true;
            }
        });        
        
                
        vm.line=function(){
     	 line=true;
        }
        
        vm.addPathway=function(id,name,recordtype){
        	if(vm.scenario.id != null){
        	vm.message="";
        	if(root==true){
        	var color=Scenario.getColor({recordtype:recordtype}, function(){
            var rect = new joint.shapes.basic.Rect({
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
         	 vm.message="You must drag root node first";
        	 var pathway=Pathway.get({id : id}, function(){
           	 if(pathway.isrootnode==true){
        	 var color=Scenario.getColor({recordtype:recordtype}, function(){
                 var rect = new joint.shapes.basic.Rect({
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
         }else{
        	 vm.message="You must select Scenario before building tree"
         }
        }
         
        vm.addCountermeasure=function(id,name,recordtype){
        	if(vm.scenario.id != null){
        	vm.message="";
        	if(root==true){
        	var color=Scenario.getColor({recordtype:recordtype}, function(){
            var rect = new joint.shapes.basic.Rect({
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
        	console.log(cellView)
        	var nodeId=cellView.model.attributes.attrs;
        	if (typeof nodeId != 'undefined'){
        		var pathwayData=Pathway.get({id:nodeId.id},function(){
            		vm.pathwayData=pathwayData; 
            		$('#pathwaymodal').modal('show');
            	});
        	}else{
        		var source = graph.getCell(cellView.model.attributes.source.id);
            	var target = graph.getCell(cellView.model.attributes.target.id);
            	console.log(source.attributes.attrs.id+"--"+target.attributes.attrs.id);
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
            	console.log(source)
            	console.log(target)
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
        	vm.scenariopathwaymbr.comment="comment";
        	vm.scenariopathwaymbr.status="Active";
        	vm.scenariopathwaymbr.lastmodifiedby="Ali"
            var lastmodifieddatetime = new Date();
        	vm.scenariopathwaymbr.lastmodifieddatetime=lastmodifieddatetime
        	vm.scenariopathwaymbr.domain="DEMO";
        	var scenario=Scenario.get({id:scenariopathway[0].scenarioId},function(){
        		 
        	});
        	
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
           	
        	
        	for(var i=0;i<pathwaypathway.length;i++){
        	 	(function(item) {
    			    setTimeout(function() {
    	    vm.pathwaypathwaymbr.comment="comment";
        	vm.pathwaypathwaymbr.logicoperator="And";
        	vm.pathwaypathwaymbr.status="Active";
        	vm.pathwaypathwaymbr.lastmodifiedby="Ali";
        	vm.pathwaypathwaymbr.lastmodifieddatetime=lastmodifieddatetime;
        	vm.pathwaypathwaymbr.domain="DEMO";
        	
        	console.log(item)
        	var childPathway=Pathway.get({id:pathwaypathway[item].targetId},function(){
        	}); 
        	
        	var parentPathway=Pathway.get({id:pathwaypathway[item].sourceId},function(){
        	});        	
        	
        	$q.all([
        		scenario.$promise,
        		parentPathway.$promise,
        		childPathway.$promise
        	]).then(function() { 
        		
        		console.log(childPathway);
            	console.log(parentPathway);
            	console.log(vm.pathwaypathwaymbr)
            	
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
        	
        	console.log(jitem)
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
              		
    }
})();
