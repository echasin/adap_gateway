(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetDetailController', AssetDetailController);

    AssetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Asset', 'Location', 'Score', 'Category', 'Subcategory', 'Recordtype', 'Assetassetmbr', 'Securitygroup', 'Identifier','Response','ResponseSearch','pagingParams','ParseLinks', 'AlertService','paginationConstants','$state'];

    function AssetDetailController($scope, $rootScope, $stateParams, previousState, entity, Asset, Location, Score, Category, Subcategory, Recordtype, Assetassetmbr, Securitygroup, Identifier,Response,ResponseSearch,pagingParams,ParseLinks, AlertService,paginationConstants,$state) {
        var vm = this;

        vm.asset = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:assetUpdate', function(event, result) {
            vm.asset = result;
        });
        $scope.$on('$destroy', unsubscribe);
        vm.assetId=$stateParams.id;
        
              
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
                ResponseSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                   // sort: sort()
                }, onSuccess, onError);
            } else {
                Response.responseByAsset({
                	id:$stateParams.id,
                	page: pagingParams.page - 1,
                    size: paginationConstants.itemsPerPage,
                    // sort: sort()
                }, onSuccess, onError);
            }
            
            function onSuccess(data, headers) {
               // vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.responses = data;
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
            //    sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
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
