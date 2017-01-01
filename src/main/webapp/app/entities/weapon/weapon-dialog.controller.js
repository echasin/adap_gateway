(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('WeaponDialogController', WeaponDialogController);

    WeaponDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Weapon', 'Recordtype', 'Category', 'Subcategory', 'Pathway', 'Countermeasurefactor'];

    function WeaponDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Weapon, Recordtype, Category, Subcategory, Pathway, Countermeasurefactor) {
        var vm = this;

        vm.weapon = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
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
            if (vm.weapon.id !== null) {
                Weapon.update(vm.weapon, onSaveSuccess, onSaveError);
            } else {
                Weapon.save(vm.weapon, onSaveSuccess, onSaveError);
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
    }
})();
