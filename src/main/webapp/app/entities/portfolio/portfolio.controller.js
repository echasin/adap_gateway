(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioController', PortfolioController);

    PortfolioController.$inject = ['$scope', '$state', 'Portfolio', 'PortfolioSearch', 'ParseLinks', 'AlertService'];

    function PortfolioController ($scope, $state, Portfolio, PortfolioSearch, ParseLinks, AlertService) {
        var vm = this;
        
        vm.portfolios = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Portfolio.query(function(result) {
                vm.portfolios = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PortfolioSearch.query({query: vm.searchQuery}, function(result) {
                vm.portfolios = result;
            });
        }    }
})();
