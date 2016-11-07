(function() {
	'use strict';

	angular.module('adapGatewayApp').controller('DashboardControllerCarb',
			DashboardControllerCarb);

	DashboardControllerCarb.$inject = [ '$scope', '$state' ];

	function DashboardControllerCarb($scope, $state) {

		$scope.metric = [ {
			"name" : "NEW XXXX MESSAGES"
		}, {
			"name" : "NEW EVENTS"
		} ]

		$scope.programs = [ {
			"program_name" : "Blueberry Scone"
		}, 
		{
			"program_name" : "Program Two"
		},
		{
			"program_name" : "Program Three"
		}
		]
		
		
		$scope.projects = [ {
			"project_name" : "Project Alpha"
		}, {
			"project_name" : "Project Beta"
		},
		{
			"project_name" : "Project Gama"
		},
		{
			"project_name" : "Program Delta"
		},
		{
			"project_name" : "Program Epsilon"
		}
		]
     
		
		
		$scope.demands = [ {
			"project_name" : "Project A",
			"demand_name" : "Demand One",
			"demand_amount" : 1000,
			"demand_year" : "2017"
		}, {
			"project_name" : "Project b",
			"demand_name" : "Demand One",
			"demand_amount" : 1000,
			"demand_year" : "2017"
		} ]

		$scope.names = [ {
			"Name" : "Max Joe",
			"City" : "Lulea",
			"Country" : "Sweden"
		}, {
			"Name" : "Manish",
			"City" : "Delhi",
			"Country" : "India"
		}, {
			"Name" : "Koniglich",
			"City" : "Barcelona",
			"Country" : "Spain"
		}, {
			"Name" : "Wolski",
			"City" : "Arhus",
			"Country" : "Denmark"
		} ];
	}
})();
