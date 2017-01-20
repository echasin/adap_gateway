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
            height: 800,
            gridSize: 1,
            model: graph,
            perpendicularLinks: true,
            restrictTranslate: true
        });
        
    var x=220;
    var y=50;
    var step=0;
    
    function excute(){
    	var rootNode=Scenario.getRoot({id:$stateParams.id}, function(){
        var rootPathway=Scenario.getPathway({id:rootNode.id}, function(){
        	var rect = new joint.shapes.basic.Rect({
	            position: { x: x, y: y },
	            size: { width: 150, height: 50 },
	            attrs: { rect: { fill: 'green' }, text: { text: rootPathway[0].parentpathway.nameshort, fill: 'white' } }
	        });
        	
        	 var cm=Scenario.getCounterMeasure({id:rootPathway[0].parentpathway.id},function(){
            	 var cmrect = new joint.shapes.basic.Rect({
     	            position: { x: x+160, y: y },
     	            size: { width: 150, height: 50 },
     	            attrs: { rect: { fill: 'yellow' }, text: { text: cm.countermeasure.name, fill: 'black' } }
     	        });
            	 var cmlink = new joint.shapes.org.Arrow({
			            source: { id: rect.id },
			            target: { id: cmrect.id }
            	 });
			        graph.addCells([cmrect,cmlink]);

        	 });
        	
        	for(var i=0;i<rootPathway.length;i++){
        		(function(index) {
    			    setTimeout(function() {
    			    	var rect2 = new joint.shapes.basic.Rect({
    			            position: { x: x*index*1.5, y: y*3 },
    			            size: { width: 150, height: 50 },
    			            attrs: { rect: { fill: 'blue' }, text: { text: rootPathway[index].childpathway.nameshort, fill: 'white' } }
    			        });
 
    			        var link = new joint.shapes.org.Arrow({
    			            source: { id: rect.id },
    			            target: { id: rect2.id },
    			            attrs: {
    			                },
    			                labels: [
    			                    { position: 0.5, attrs: { text: { text:  rootPathway[index].logicoperator, fill: 'black', 'font-family': 'sans-serif' }, rect: { stroke: '#AF104D', 'stroke-width': 20, rx: 5, ry: 5 } }}
    			                ]
    			            
    			        });

    			       
    			        graph.addCells([rect, rect2, link]);
    			        
    			        var cm2=Scenario.getCounterMeasure({id:rootPathway[index].childpathway.id},function(){
    			        	var cmrect2 = new joint.shapes.basic.Rect({
    		     	            position: { x: (x*index*1.5)+160, y: y*3 },
    		     	            size: { width: 150, height: 50 },
    		     	            attrs: { rect: { fill: 'yellow' }, text: { text: cm2.countermeasure.name, fill: 'black' } }
    		     	        });
    		            	 var cmlink2 = new joint.shapes.org.Arrow({
    					            source: { id: rect2.id },
    					            target: { id: cmrect2.id }
    		            	 });
    					        graph.addCells([cmrect2,cmlink2]);

    		        	 });
    			        
    			        var child=Scenario.getPathway({id:rootPathway[index].childpathway.id}, function(){
    			        	for(var j=0;j<child.length;j++){
    			        		(function(item) {
    			    			    setTimeout(function() {
    			        		
    			    			    var rect3 = new joint.shapes.basic.Rect({
    	    			            position: { x: x*(step)*1.5, y: y*6 },
    	    			            size: { width: 150, height: 50 },
    	    			            attrs: { rect: { fill: 'gray' }, text: { text: child[item].childpathway.nameshort, fill: 'white' } }
    	    			        });
    			        		
    	    			        var link1 = new joint.shapes.org.Arrow({
    	    			            source: { id: rect2.id },
    	    			            target: { id: rect3.id },
    	    			            attrs: {
    	    			                },
    	    			            labels: [
        			                    { position: 0.5, attrs: { text: { text:  child[item].logicoperator, fill: 'black', 'font-family': 'sans-serif' }, rect: { stroke: '#AF104D', 'stroke-width': 20, rx: 5, ry: 5 } }}
        			                ]
    	    			        });
    	    			        graph.addCells([rect2, rect3, link1]);
    	    			        var stepcm=0
    	    			        var cm3=Scenario.getCounterMeasure({id:child[item].childpathway.id},function(){
    	    			        	console.log(item)
    	    			        	console.log(stepcm)
    	    			        	console.log(cm3)
    	    			        	
    	    			        	var cmrect3= new joint.shapes.basic.Rect({
    	    		     	            position: { x: x*(stepcm)*1.5, y: y*7.5 },
    	    		     	            size: { width: 150, height: 50 },
    	    		     	            attrs: { rect: { fill: 'yellow' }, text: { text: cm3.countermeasure.name, fill: 'black' } }
    	    		     	        });
    	    		            	 var cmlink3 = new joint.shapes.org.Arrow({
    	    					            source: { id: rect3.id },
    	    					            target: { id: cmrect3.id }
    	    		            	 });
    	    		            	 stepcm+=0.5;
    	    					        graph.addCells([cmrect3,cmlink3]);
    	    					        

    	    		        	 });
    	    			        step+=0.5;
    			        	 });
    		  			     })(j);
    			        	}
    			        	
    			        });
    			        
      			    });
  			  })(i);
        	}
         });
        });
    }
    
    excute();
    }
})();
