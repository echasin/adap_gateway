(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', '$state', 'Dashboard', 'DashboardSearch'];

    function DashboardController ($scope, $state, Dashboard, DashboardSearch) {
        var vm = this;
        
        vm.dashboards = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Dashboard.query(function(result) {
                vm.dashboards = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            DashboardSearch.query({query: vm.searchQuery}, function(result) {
                vm.dashboards = result;
            });
        }    }
})();
