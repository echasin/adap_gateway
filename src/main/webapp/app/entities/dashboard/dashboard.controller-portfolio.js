(function() {
	'use strict';

	angular.module('adapGatewayApp').controller('DashboardControllerPortfolio',
			DashboardControllerPortfolio);

	DashboardControllerPortfolio.$inject = [ '$scope', '$state' , 'Portfolio' , 'Project' ];

	function DashboardControllerPortfolio($scope, $state , Portfolio , Project) {

	       
		
		var data=[];
		Portfolio.chartData().$promise.then(function(object){            
            for(var x=0;x < object.length;x++){
            	(function(index) {
    			    setTimeout(function() {
                    data.push({nameshort : object[index].nameShort , y : object[index].countProject});
                    Highcharts
    				.chart(
    						'programsbyportfolio',
    						{
    							chart : {
    								plotBackgroundColor : null,
    								plotBorderWidth : null,
    								plotShadow : false,
    								type : 'pie'
    							},
    							title : {
    								text : "Programs by Portfolio"
    							},
    							tooltip : {
    								pointFormat : '{point.name}: <b>{point.y}</b>'
    							},
    							plotOptions : {
    								pie : {
    									allowPointSelect : true,
    									cursor : 'pointer',
    									dataLabels : {
    										enabled : true,
    										format : '<b>{point.nameshort}</b>: {point.y}',
    										style : {
    											color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
    													|| 'black'
    										}
    									},
    									showInLegend : false,
    									size: 100
    								}
    							},
    							series : [ {
    								name : 'Organizations',
    								colorByPoint : true,
    								data : data
    							} ]
    						});
                });
    			    
  			  })(x);
            } 
        });
		
		

	}
})();
