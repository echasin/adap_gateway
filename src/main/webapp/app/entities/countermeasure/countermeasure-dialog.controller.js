(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasureDialogController', CountermeasureDialogController);

    CountermeasureDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Countermeasure', 'Recordtype', 'Category', 'Subcategory', 'Pathwaycountermeasurembr'];

    function CountermeasureDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Countermeasure, Recordtype, Category, Subcategory, Pathwaycountermeasurembr) {
        var vm = this;

        vm.countermeasure = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.pathwaycountermeasurembrs = Pathwaycountermeasurembr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.countermeasure.id !== null) {
                Countermeasure.update(vm.countermeasure, onSaveSuccess, onSaveError);
            } else {
                Countermeasure.save(vm.countermeasure, onSaveSuccess, onSaveError);
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
    }
})();
