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
