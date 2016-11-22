(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioController', PortfolioController);

    PortfolioController.$inject = ['$scope', '$state', 'Portfolio', 'PortfolioSearch', 'ParseLinks', 'AlertService','pagingParams' , 'paginationConstants'];

    function PortfolioController ($scope , $state, Portfolio, PortfolioSearch, ParseLinks, AlertService,pagingParams , paginationConstants) {
        
    	var vm = this;
        vm.portfolios = [];
        vm.search = search;
        vm.loadAll = loadAll;
        loadAll();
        function loadAll() {
            Portfolio.query(function(result) {
                vm.portfolios = result;
                vm.count=result.length;
            });
        }
        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            PortfolioSearch.query({query: vm.searchQuery}, function(result) {
                vm.portfolios = result;
            });
        }
     
        
        
        
        
        
        var vm = this;
        vm.loadAll = loadAll;
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.clear = clear;
        vm.search = search;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        vm.loadAll();

        
        function loadAll () {
            if (pagingParams.search) {
            	PortfolioSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
            	Portfolio.query({
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            }
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
               vm.links = ParseLinks.parse(headers('link'));
                console.log("*////////////********")
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.portfolios  = data;
                vm.count=data.length;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function search (searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.page = 1;
            vm.predicate = '_score';
            vm.reverse = false;
            vm.currentSearch = searchQuery;
            vm.transition();
        }

        function clear () {
            vm.links = null;
            vm.page = 1;
            vm.predicate = 'id';
            vm.reverse = true;
            vm.currentSearch = null;
            vm.transition();
        }

        
    
    
    
    
    
    
    
    
    }
})();
