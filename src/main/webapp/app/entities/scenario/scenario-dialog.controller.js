(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenarioDialogController', ScenarioDialogController);

    ScenarioDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Scenario', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr', 'Account'];

    function ScenarioDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Scenario, Recordtype, Category, Subcategory, Scenariopathwaymbr, Account) {
        var vm = this;

        vm.scenario = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories=entity.categories;
        vm.subcategories=entity.subcategories;
        
        vm.scenariopathwaymbrs = Scenariopathwaymbr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            console.log(vm.scenario);
            var lastmodifieddatetime = new Date();
            if (vm.scenario.id !== null) {
            	Account.get().$promise.then(function(currentUser){
                 	vm.scenario.domain=currentUser.data.domain
                 	vm.scenario.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.scenario.status="Active";
                 	vm.scenario.lastmodifieddatetime=lastmodifieddatetime;
                Scenario.update(vm.scenario, onSaveSuccess, onSaveError);
            	});
            } else {
            	Account.get().$promise.then(function(currentUser){
                 	vm.scenario.domain=currentUser.data.domain
                 	vm.scenario.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.scenario.status="Active";
                 	vm.scenario.lastmodifieddatetime=lastmodifieddatetime;
                Scenario.save(vm.scenario, onSaveSuccess, onSaveError);
            	});
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:scenarioUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        
        vm.getCategories=function(id){
        	vm.categories = Category.categoriesByRecordtype({id:id});
        	vm.subcategories=null;
        }
        
         
        vm.getSubCategories=function(id){
        	vm.subcategories=Subcategory.subCategoriesByCategory({id:vm.scenario.categories[0].id});
        	console.log(vm.subcategories);
        }
        
    }
})();
