(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('TargetDialogController', TargetDialogController);

    TargetDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Target', 'Recordtype', 'Category', 'Subcategory', 'Pathway','Account'];

    function TargetDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Target, Recordtype, Category, Subcategory, Pathway,Account) {
        var vm = this;

        vm.target = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.pathways = Pathway.query();
        vm.categories=entity.categories;
        vm.subcategories=entity.subcategories;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            var lastmodifieddatetime = new Date();
            if (vm.target.id !== null) {
            	Account.get().$promise.then(function(currentUser){
                 	vm.target.domain=currentUser.data.domain
                 	vm.target.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.target.status="Active";
                 	vm.target.lastmodifieddatetime=lastmodifieddatetime;
                Target.update(vm.target, onSaveSuccess, onSaveError);
            	});
            } else {
            	Account.get().$promise.then(function(currentUser){
                 	vm.target.domain=currentUser.data.domain
                 	vm.target.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.target.status="Active";
                 	vm.target.lastmodifieddatetime=lastmodifieddatetime;
                Target.save(vm.target, onSaveSuccess, onSaveError);
            	 });
            	}
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:targetUpdate', result);
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
        	vm.subcategories=Subcategory.subCategoriesByCategory({id:vm.target.categories[0].id});
        }
    }
})();
