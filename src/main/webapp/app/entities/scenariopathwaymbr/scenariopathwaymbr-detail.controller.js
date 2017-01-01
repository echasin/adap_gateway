(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenariopathwaymbrDetailController', ScenariopathwaymbrDetailController);

    ScenariopathwaymbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Scenariopathwaymbr', 'Scenario', 'Pathway'];

    function ScenariopathwaymbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Scenariopathwaymbr, Scenario, Pathway) {
        var vm = this;

        vm.scenariopathwaymbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:scenariopathwaymbrUpdate', function(event, result) {
            vm.scenariopathwaymbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
