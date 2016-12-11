(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProgramEditController', ProgramEditController);

    ProgramEditController.$inject = ['$timeout', '$state', '$scope', '$stateParams', '$location', 'Account', 'entity', 'Portfolio','Project', 'Projectprojectmbr', 'Portfolioprojectmbr', 'Requestprojectmbr', 'Category', 'Subcategory', 'Recordtype','Activity','ParseLinks', 'AlertService', 'pagingParams', 'paginationConstants'];

    function ProgramEditController ($timeout, $state,$scope, $stateParams, $location, Account,entity, Portfolio,Project, Projectprojectmbr, Portfolioprojectmbr, Requestprojectmbr, Category, Subcategory, Recordtype , Activity, ParseLinks, AlertService, pagingParams, paginationConstants) {
        var vm = this;
	
        vm.project = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.projectprojectmbrs = Projectprojectmbr.query();
        vm.requestprojectmbrs = Requestprojectmbr.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.recordtypes = Recordtype.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function onSaveSuccess (result) {
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        
        Activity.activitiesByProject({id:$stateParams.id}).$promise.then(function(activity){         	
        	for(var x=0;x<activity.length;x++){
        		(function(index) {
    			    setTimeout(function() {
        		if(activity[index].recordtype.id==30000){
        			activity[index].color="yellow-bg";
            		activity[index].icon="fa fa-key";
        		}if(activity[index].recordtype.id==30001){
        			activity[index].color="lazur-bg";
            		activity[index].icon="fa fa-dollar";
        		}if(activity[index].recordtype.id==30002){
        			activity[index].color="yellow-bg";
            		activity[index].icon="fa fa-comments";
        		}if(activity[index].recordtype.id==30003){
        			activity[index].color="blue-bg";
            		activity[index].icon="fa fa-tasks";
        		}
        		
    			    });
  			  })(x); 
        	}
        	vm.activities=activity;
        });
        
        function save() {
        	Account.get().$promise.then(function(currentUser){
             	vm.project.domain=currentUser.data.domain
             	vm.project.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.project.status="Active";
             	Project.update(vm.project, onSaveSuccess, onSaveError);
        	});
        }
        
        function cancel () {
            $location.path("portfolio-edit"+$stateParams.id);
        }
        
        
        
        
        
        
        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.clear = clear;
        vm.search = search;
        vm.searchQuery = pagingParams.search;
        vm.currentSearch = pagingParams.search;

        loadAll();

        function loadAll () {
            if (pagingParams.search) {
                PortfolioprojectmbrSearch.query({
                    query: pagingParams.search,
                    page: pagingParams.page - 1,
                    size: vm.itemsPerPage,
                    sort: sort()
                }, onSuccess, onError);
            } else {
            	 Projectprojectmbr.query({
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
                vm.portfolioprojectmbrs = data;
                console.log(data)
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
