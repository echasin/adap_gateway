(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestprojectmbrController', RequestprojectmbrController);

    RequestprojectmbrController.$inject = ['$scope', '$state', 'Requestprojectmbr', 'RequestprojectmbrSearch'];

    function RequestprojectmbrController ($scope, $state, Requestprojectmbr, RequestprojectmbrSearch) {
        var vm = this;
        
        vm.requestprojectmbrs = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Requestprojectmbr.query(function(result) {
                vm.requestprojectmbrs = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            RequestprojectmbrSearch.query({query: vm.searchQuery}, function(result) {
                vm.requestprojectmbrs = result;
            });
        }    }
})();
