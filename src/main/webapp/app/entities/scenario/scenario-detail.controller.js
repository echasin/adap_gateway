(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenarioDetailController', ScenarioDetailController);

    ScenarioDetailController.$inject = ['$scope', '$q','$rootScope', '$stateParams', 'previousState', 'entity', 'Scenario', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr'];

    function ScenarioDetailController($scope, $q, $rootScope, $stateParams, previousState, entity, Scenario, Recordtype, Category, Subcategory, Scenariopathwaymbr) {
        var vm = this;

        vm.scenario = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:scenarioUpdate', function(event, result) {
            vm.scenario = result;
        });
        $scope.$on('$destroy', unsubscribe);


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
        
    var x=220;
    var y=50;
    var step=1;
    
    function excute(){
    	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
    		console.log(rootNode)
        var rootPathway=Scenario.getPathway({id:rootNode.pathway.id}, function(){
        	console.log(rootPathway);
        	var rect = new joint.shapes.basic.Rect({
	            position: { x: x, y: y },
	            size: { width: 150, height: 50 },
	            attrs: { rect: { fill: "green" }, text: { text: rootPathway[0].pathwaypathwaymbr.parentpathway.nameshort, fill: 'white' } }
	        });
        	graph.addCells([rect]);
        	buildLevels(rootPathway,rect)
         });
        });
    }
    
   Scenario.getColor();
    var item=0;
        
    function buildLevels(rootPathway,rect){
    		for(var i=0;i<rootPathway.length;i++){
        		(function(index) {
    			    setTimeout(function() {
    			    	var rect2 = new joint.shapes.basic.Rect({
    			            position: { x: x*item, y: y*3*step },
    			            size: { width: 150, height: 50 },
    			            attrs: { rect: { fill: rootPathway[index].color }, text: { text: rootPathway[index].pathwaypathwaymbr.childpathway.nameshort, fill: 'white' } }
    			        });
    			    	console.log(index+"-------"+item)
    			    	console.log(rootPathway[index].pathwaypathwaymbr.childpathway.nameshort)
    			    	
    			        var link = new joint.shapes.org.Arrow({
    			            source: { id: rect.id },
    			            target: { id: rect2.id },
    			            attrs: {
    			                },
    			                labels: [
    			                    { position: 0.5, attrs: { text: { text:  rootPathway[index].pathwaypathwaymbr.logicoperator, fill: 'black', 'font-family': 'sans-serif' }, rect: { stroke: '#AF104D', 'stroke-width': 20, rx: 5, ry: 5 } }}
    			                ]
    			        });
    			        graph.addCells([rect2, link]);
    			        for(var c=0; c < rootPathway[index].pathwaycountermeasurembrs.length;c++){
   			        	 var cmrect3= new joint.shapes.basic.Rect({
    		     	            position: { x: x*item, y: y*3*step+80 },
    		     	            size: { width: 150, height: 50 },
    		     	            attrs: { rect: { fill: 'yellow' }, text: { text: rootPathway[index].pathwaycountermeasurembrs[c].countermeasure.name, fill: 'black' } }
    		     	        });
    		            	 var cmlink3 = new joint.shapes.org.Arrow({
    					            source: { id: rect2.id },
    					            target: { id: cmrect3.id }
    		            	 });
    					        graph.addCells([cmrect3,cmlink3]);    	
    					    }
    			        item++
    			        var child=Scenario.getPathway({id:rootPathway[index].pathwaypathwaymbr.childpathway.id}, function(){
    			        	buildLevels(child,rect2)
        			        step+=0.5;
    			        	item=1;
    			        });
      			    });
  			  })(i);
        	}
    }
    
    excute();

    }
})();

/**
var cm=[];
for(var c=0; c < child[item].pathwaycountermeasurembrs.length;c++){
	 cm.push(child[item].pathwaycountermeasurembrs[c].countermeasure.name);
	 console.log(cm)
}
var cmrect3= new joint.shapes.basic.Rect({
      position: { x: x*(step)*1.5, y: y*7.5 },
      size: { width: 150, height: 50 },
      attrs: { rect: { fill: 'yellow' }, text: { text: cm.join("\n"), fill: 'black' } }
  });
	 var cmlink3 = new joint.shapes.org.Arrow({
         source: { id: rect3.id },
         target: { id: cmrect3.id }
	 });
     graph.addCells([cmrect3,cmlink3]);
     **/
/**
for(var c=0; c < child[j].pathwaycountermeasurembrs.length;c++){
    	    			        	 var cmrect3= new joint.shapes.basic.Rect({
     	    		     	            position: { x: x*(step)*1.5, y: y*7.5+60*c },
     	    		     	            size: { width: 150, height: 50 },
     	    		     	            attrs: { rect: { fill: 'yellow' }, text: { text: child[j].pathwaycountermeasurembrs[c].countermeasure.name, fill: 'black' } }
     	    		     	        });
     	    		            	 var cmlink3 = new joint.shapes.org.Arrow({
     	    					            source: { id: rect3.id },
     	    					            target: { id: cmrect3.id }
     	    		            	 });
     	    					        graph.addCells([cmrect3,cmlink3]);    	
     	    					    }
**/