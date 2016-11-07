(function() {
	'use strict';

	angular.module('adapGatewayApp').controller('DashboardControllerPortfolio',
			DashboardControllerPortfolio);

	DashboardControllerPortfolio.$inject = [ '$scope', '$state' ];

	function DashboardControllerPortfolio($scope, $state) {

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
								data : [ {
									nameshort : 'CSPE',
									y : 5
								}, {
									nameshort : 'SCO',
									y : 2,
								}, {
									name : "Office of Information Technology",
									nameshort : 'OIT',
									y : 10
								}, {
									nameshort : 'IRIS',
									y : 4
								}, {
									name : 'FO',
									y : 0
								}, {
									nameshort : 'FRNS',
									y : 1
								} ]
							} ]
						});

	}
})();
