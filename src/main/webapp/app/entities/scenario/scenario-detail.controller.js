(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenarioDetailController', ScenarioDetailController);

    ScenarioDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Scenario', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr'];

    function ScenarioDetailController($scope, $rootScope, $stateParams, previousState, entity, Scenario, Recordtype, Category, Subcategory, Scenariopathwaymbr) {
        var vm = this;

        vm.scenario = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:scenarioUpdate', function(event, result) {
            vm.scenario = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
