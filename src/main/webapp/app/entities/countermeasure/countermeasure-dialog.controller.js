(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasureDialogController', CountermeasureDialogController);

    CountermeasureDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Countermeasure', 'Recordtype', 'Category', 'Subcategory', 'Pathwaycountermeasurembr','Account'];

    function CountermeasureDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Countermeasure, Recordtype, Category, Subcategory, Pathwaycountermeasurembr,Account) {
        var vm = this;

        vm.countermeasure = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.pathwaycountermeasurembrs = Pathwaycountermeasurembr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            var lastmodifieddatetime = new Date();
            if (vm.countermeasure.id !== null) {
            	Account.get().$promise.then(function(currentUser){
                 	vm.countermeasure.domain=currentUser.data.domain
                 	vm.countermeasure.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.countermeasure.status="Active";
                 	vm.countermeasure.lastmodifieddatetime=lastmodifieddatetime;
                Countermeasure.update(vm.countermeasure, onSaveSuccess, onSaveError);
              });
            } else {
            	Account.get().$promise.then(function(currentUser){
                 	vm.countermeasure.domain=currentUser.data.domain
                 	vm.countermeasure.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.countermeasure.status="Active";
                 	vm.countermeasure.lastmodifieddatetime=lastmodifieddatetime;
                Countermeasure.save(vm.countermeasure, onSaveSuccess, onSaveError);
             });
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:countermeasureUpdate', result);
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
        }
        
        vm.getSubCategories=function(id){
        	vm.subcategories=Subcategory.subCategoriesByCategory({id:vm.countermeasure.categories[0].id});
        	console.log(vm.subcategories);
        }
        
        
    }
})();
