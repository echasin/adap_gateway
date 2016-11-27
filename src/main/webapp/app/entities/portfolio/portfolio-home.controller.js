(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioHomeController', PortfolioHomeController);

    PortfolioHomeController.$inject = ['$scope', '$state', 'Portfolio', 'PortfolioSearch', 'ParseLinks', 'AlertService','pagingParams' , 'paginationConstants'];

    function PortfolioHomeController ($scope , $state, Portfolio, PortfolioSearch, ParseLinks, AlertService,pagingParams , paginationConstants) {
           
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
        vm.getFinancial=getFinancial();

        
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

        
        function getFinancial(){
        	Portfolio.financial().$promise.then(function(financial){  
              
        		$.pivotUtilities.tipsData=financial;
        		var utils = $.pivotUtilities;
        		var heatmap =  utils.renderers["Heatmap"];
        		var sumOverSum =  utils.aggregators["Integer Sum"];

        		$("#pivot").pivot(
        		  utils.tipsData, {
        			  rows: ["requeststateName"],
                      cols: ["fiscalyearValue"],
        		    aggregator: sumOverSum(["amountrequested"]),
        		    renderer: heatmap
        		  });
        		
        		    
            $("#pivotui").pivotUI(financial, {
                rows: ["requeststateName"],
                cols: ["fiscalyearValue"],
                aggregatorName: "Integer Sum",
                vals: ["amountrequested"],
                rendererName: "Heatmap"
            });
            
        	});
        }
      
    }
})();
