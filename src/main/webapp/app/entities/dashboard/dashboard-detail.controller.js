(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('DashboardDetailController', DashboardDetailController);

    DashboardDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Dashboard'];

    function DashboardDetailController($scope, $rootScope, $stateParams, previousState, entity, Dashboard) {
        var vm = this;

        vm.dashboard = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:dashboardUpdate', function(event, result) {
            vm.dashboard = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
