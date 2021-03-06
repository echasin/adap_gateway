(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenarioDetailController', ScenarioDetailController);

    ScenarioDetailController.$inject = ['$scope', '$q','$location','$rootScope', '$stateParams', 'previousState', 'entity', 'Scenario', 'Pathway','Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr','Pathwaypathwaymbr','Account'];

    function ScenarioDetailController($scope, $q, $location,$rootScope, $stateParams, previousState, entity, Scenario, Pathway, Recordtype, Category, Subcategory, Scenariopathwaymbr,Pathwaypathwaymbr,Account) {
        var vm = this;

        vm.scenario = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:scenarioUpdate', function(event, result) {
            vm.scenario = result;
        });
        $scope.$on('$destroy', unsubscribe);
        
        var x=220;
        var y=50;
        var step=1;
        var item=0;
        var scenariopathway=[];
        var pathwaypathway=[];
        var countermeasure=[];
        vm.newscenario={};
        vm.scenariopathwaymbr={};
       
        vm.pathwaycountermeasurembr={};
        vm.recordtypes = Recordtype.query();
        vm.getCategories=function(id){
        	vm.categories = Category.categoriesByRecordtype({id:id});
        }
        
        
        
        var graph = new joint.dia.Graph();

        var paper = new joint.dia.Paper({
            el: $('#paper'),
            width: 1200,
            height: 1800,
            gridSize: 1,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true
        });
        
        function excute(){
        	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
        		console.log(rootNode.pathway.id)
        		console.log($stateParams.id)
            var rootPathway=Scenario.getPathway({pathwayId :rootNode.pathway.id,scenarioId:$stateParams.id}, function(){
            	console.log(rootPathway);
            	var rect = new joint.shapes.basic.Rect({
    	            position: { x: rootNode.xcoordinate, y: rootNode.ycoordinate },
    	            size: { width: 100, height: 40 },
    	            attrs: { rect: { fill: "green" }, text: { text: rootNode.pathway.nameshort, fill: 'white' } }
    	        });
            	rect.attr('id', rootNode.pathway.id)
            	graph.addCells([rect]);
            	scenariopathway.push({"pathwayId":rootNode.pathway.id})
            	buildLevels(rootPathway,rect)
             });
            });
        }    
        
        function excute(){
        	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
        		if (typeof rootNode.id != 'undefined'){
                    var rootPathway=Scenario.getPathway({pathwayId :rootNode.pathway.id,scenarioId:$stateParams.id}, function(){
            	    var rect = new joint.shapes.tm.Actor({
    	             position: { x: rootNode.xcoordinate, y: rootNode.ycoordinate },
    	             size: { width: 100, height: 40 },
    	             attrs: { rect: { fill: "green" }, text: { text: rootNode.pathway.nameshort, fill: 'white' } }
    	              });
            	     rect.attr('id', rootNode.pathway.id)
            	     graph.addCells([rect]);
                 	 buildLevels(rootPathway,rect)
                  });
        		}else{
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
        			        graph.addCells([rect2, link]);
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
        		            	    graph.addCells([cmrect3,cmlink3]);
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
        
        
        vm.openScenarioModal=function(){
        	 $('#scenariomodal').modal('show');
        }
        
        vm.closescenariomodal=function(){
        	$('#scenariomodal').modal('hide');
        }
        
        function cleanResponse(resp) {
            return JSON.parse(angular.toJson(resp));
        }
        
        vm.saveNewScenario=function(){
          	 Account.get().$promise.then(function(currentUser){
             	var lastmodifieddatetime = new Date();
             	vm.newscenario.domain=currentUser.data.domain
             	vm.newscenario.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.newscenario.status="Active";
             	vm.newscenario.lastmodifieddatetime=lastmodifieddatetime;

        	var scenario=Scenario.save(vm.newscenario);
        		
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
        	
        	console.log(pathwaypathway);
        	for(var i=0;i<pathwaypathway.length;i++){
        		 
        	 	(function(item) {
    			    setTimeout(function() {
    	   
        	Pathway.get({id:pathwaypathway[item].sourceId},function(parentPathway){
        	
        	
        	Pathway.get({id:pathwaypathway[item].targetId},function(childPathway){
        	         	
        	$q.all([
        		scenario.$promise,
        		parentPathway.$promise,
        		childPathway.$promise
        	]).then(function() { 
        		
        		vm.pathwaypathwaymbr={};
        		
        		vm.pathwaypathwaymbr.comment="comment";
             	vm.pathwaypathwaymbr.logicoperator="And";
             	vm.pathwaypathwaymbr.status="Active";
             	vm.pathwaypathwaymbr.lastmodifiedby="Ali";
             	vm.pathwaypathwaymbr.lastmodifieddatetime=lastmodifieddatetime;
             	vm.pathwaypathwaymbr.domain="DEMO";
             	
        		vm.scenario = cleanResponse(scenario)
        		vm.pathwaypathwaymbr.scenario=vm.scenario;
        		
        		vm.parentPathway = cleanResponse(parentPathway)
        		vm.pathwaypathwaymbr.parentpathway=vm.parentPathway;
        		
        		vm.childPathway = cleanResponse(childPathway)
        		vm.pathwaypathwaymbr.childpathway=vm.childPathway; 
        		
        		Pathwaypathwaymbr.save(vm.pathwaypathwaymbr)
        	  });
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
        	$('#scenariomodal').modal('hide');
         });
       }
        
        vm.cancel=function(){
      	  $location.path("/scenario");
        }
        
        
    }
})();