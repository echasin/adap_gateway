(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivitymbrController', ActivitymbrController);

    ActivitymbrController.$inject = ['$scope', '$state', 'Activitymbr', 'ActivitymbrSearch'];

    function ActivitymbrController ($scope, $state, Activitymbr, ActivitymbrSearch) {
        var vm = this;
        
        vm.activitymbrs = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Activitymbr.query(function(result) {
                vm.activitymbrs = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            ActivitymbrSearch.query({query: vm.searchQuery}, function(result) {
                vm.activitymbrs = result;
            });
        }    }
})();
