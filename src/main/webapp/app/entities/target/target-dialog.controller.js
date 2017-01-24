(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('TargetDialogController', TargetDialogController);

    TargetDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Target', 'Recordtype', 'Category', 'Subcategory', 'Pathway'];

    function TargetDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Target, Recordtype, Category, Subcategory, Pathway) {
        var vm = this;

        vm.target = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.pathways = Pathway.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.target.id !== null) {
                Target.update(vm.target, onSaveSuccess, onSaveError);
            } else {
                Target.save(vm.target, onSaveSuccess, onSaveError);
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
    }
})();
