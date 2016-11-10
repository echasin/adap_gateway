(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestController', RequestController);

    RequestController.$inject = ['$scope', '$state', 'Request', 'RequestSearch'];

    function RequestController ($scope, $state, Request, RequestSearch) {
        var vm = this;
        
        vm.requests = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Request.query(function(result) {
                vm.requests = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            RequestSearch.query({query: vm.searchQuery}, function(result) {
                vm.requests = result;
            });
        }    }
})();
