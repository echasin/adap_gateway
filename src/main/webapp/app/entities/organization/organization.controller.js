(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$scope', '$state', 'Organization', 'OrganizationSearch', 'ParseLinks', 'AlertService'];

    function OrganizationController ($scope, $state, Organization, OrganizationSearch, ParseLinks, AlertService) {
        var vm = this;
        
        vm.organizations = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Organization.query(function(result) {
                vm.organizations = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            OrganizationSearch.query({query: vm.searchQuery}, function(result) {
                vm.organizations = result;
            });
        }    }
})();
