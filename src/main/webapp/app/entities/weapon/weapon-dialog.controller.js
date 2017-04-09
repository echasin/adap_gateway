(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('WeaponDialogController', WeaponDialogController);

    WeaponDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Weapon', 'Recordtype', 'Category', 'Subcategory', 'Pathway', 'Countermeasurefactor','Account'];

    function WeaponDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Weapon, Recordtype, Category, Subcategory, Pathway, Countermeasurefactor,Account) {
        var vm = this;

        vm.weapon = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.pathways = Pathway.query();
        vm.countermeasurefactors = Countermeasurefactor.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            var lastmodifieddatetime = new Date();
            if (vm.weapon.id !== null) {
            	Account.get().$promise.then(function(currentUser){
            	vm.weapon.domain=currentUser.data.domain
             	vm.weapon.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.weapon.status="Active";
             	vm.weapon.lastmodifieddatetime=lastmodifieddatetime;
                Weapon.update(vm.weapon, onSaveSuccess, onSaveError);
            });
            } else {
            	Account.get().$promise.then(function(currentUser){
            	vm.weapon.domain=currentUser.data.domain
             	vm.weapon.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.weapon.status="Active";
             	vm.weapon.lastmodifieddatetime=lastmodifieddatetime;
                Weapon.save(vm.weapon, onSaveSuccess, onSaveError);
             });
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:weaponUpdate', result);
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
        	vm.subcategories=Subcategory.subCategoriesByCategory({id:vm.weapon.categories[0].id});
        	console.log(vm.subcategories);
        }
        
    }
})();
