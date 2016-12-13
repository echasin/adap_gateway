(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioEditController', PortfolioEditController);

    PortfolioEditController.$inject = ['$timeout','$location', '$scope', '$stateParams', 'entity','Portfolio', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype','$state','Account','ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function PortfolioEditController ($timeout,$location, $scope, $stateParams, entity,Portfolio, Portfolioprojectmbr, Category, Subcategory, Recordtype,$state,Account,ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;

        vm.portfolio = entity;
        vm.cancel = cancel;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.recordtypes = Recordtype.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function cancel () {
            $location.path("portfolio-home");
        }

        
        function save() {
        	Account.get().$promise.then(function(currentUser){
             	vm.portfolio.domain=currentUser.data.domain
             	vm.portfolio.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.portfolio.status="Active";
                Portfolio.update(vm.portfolio, onSaveSuccess, onSaveError);
        	});
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:portfolioUpdate', result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.search = search;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;
        
        
        
        vm.loadPageProject = loadPageProject;
        vm.predicateProject  = pagingParams.predicate;
        vm.reverseProject  = pagingParams.ascending;
        vm.transitionProject  = transitionProject;
        vm.transitionProject = transitionProject;
        vm.itemsPerPageProject  = paginationConstants.itemsPerPage;
        vm.clearProject  = clear;
        vm.searchProject  = searchProject;
        vm.searchQueryProject  = pagingParams.search;
        vm.currentSearchProject  = pagingParams.search;

        load();        

        function load() {
            if (pagingParams.search) {
                PortfolioprojectmbrSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPageProject,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Portfolio.portfolioprojectmbrs({id:$stateParams.id,
                	name:"Project",
                    page: 0,
                    size: vm.itemsPerPageProject,
                    sort: sortProject()
                }, onSuccessProject, onError);
                Portfolio.portfolioprojectmbrs({id:$stateParams.id,
                	name:"Program",
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
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
                vm.portfolioprogrammbrs = data;
                console.log(data)
                vm.page = pagingParams.page;
            }
            function sortProject() {
                var result = [vm.predicateProject + ',' + (vm.reverseProject ? 'asc' : 'desc')];
                if (vm.predicateProject !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccessProject(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItemsProject  = headers('X-Total-Count');
                vm.queryCountProject  = vm.totalItemsProject;
                vm.portfolioprojectmbrs = data;
                console.log(data)
                vm.pageProject  = 0;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
  /**      
        
        function loadProgram () {
            if (pagingParams.search) {
                PortfolioprojectmbrSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
                Portfolio.portfolioprojectmbrs({id:$stateParams.id,
                	name:"Program",
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
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
                vm.portfolioprogrammbrs = data;
                console.log(data)
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
**/
        function loadPage (page) {
            vm.page = page;
            vm.transition();
        }

        function transition () {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch,
                id: $stateParams.id
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

        function loadPageProject (page) {
            vm.pageProject = page;
            vm.transitionProject();
        }

        function transitionProject () {
            $state.transitionTo($state.$current, {
                page: vm.pageProject,
                sort: vm.predicateProject + ',' + (vm.reverseProject ? 'asc' : 'desc'),
                search: vm.currentSearchProject,
                id: $stateParams.id
            });
        }

        function searchProject (searchQuery) {
            if (!searchQuery){
                return vm.clear();
            }
            vm.links = null;
            vm.pageProject = 1;
            vm.predicateProject = '_score';
            vm.reverseProject = false;
            vm.currentSearchProject = searchQuery;
            vm.transitionProject();
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
