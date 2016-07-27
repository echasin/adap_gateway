(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScoreController', ScoreController);

    ScoreController.$inject = ['$scope', '$state', 'Score', 'ScoreSearch', 'ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants','Asset'];

    function ScoreController ($scope, $state, Score, ScoreSearch, ParseLinks, AlertService, pagingParams, paginationConstants,Asset) {
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

        $scope.workFlowsName = Score.getWorkFlows(); 
        $scope.ruleFlowsName = Score.getRuleFiles();
        function loadAll () {
            if (pagingParams.search) {
                ScoreSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Score.query({
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
                vm.scores = data;
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

        $scope.loadFilters = function() {
        	Asset.assets(
				function(data) {
				$scope.filters = data;
			});
		}
		$scope.loadFilters();
		
		$scope.fireWorkflows = function() {
			Asset
					.fireWorkflows(
							{
								assetId : $scope.assetId,
								fileName : $scope.fileName,
								ruleFile : $scope.ruleFile
							},
							function(result) {
								loadAll();
								$scope.workflow = result;
								console.log(result);
							});
		};
    }
})();
