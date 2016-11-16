(function() {
	'use strict';

	angular.module('adapGatewayApp').controller('DashboardControllerPortfolio',
			DashboardControllerPortfolio);

	DashboardControllerPortfolio.$inject = [ '$scope', '$state' , 'Portfolio' , 'Project' ];

	function DashboardControllerPortfolio($scope, $state , Portfolio , Project) {

		var data=[];
		Portfolio.query().$promise.then(function(portfolio){            
            for(var x=0;x < portfolio.length;x++){
            	(function(index) {
    			    setTimeout(function() {
    			    	console.log(portfolio[index].recordtype.id);
                Project.projectsByRecordtype({id:portfolio[index].recordtype.id}).$promise.then(function(project){                
                    data.push({nameshort : portfolio[index].nameshort , y : project.length});
                    console.log(data)
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
    			    });
  			  })(x);
            } 
        });
		
		

	}
})();
