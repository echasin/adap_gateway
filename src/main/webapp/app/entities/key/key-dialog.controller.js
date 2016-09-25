(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('KeyDialogController', KeyDialogController);

    KeyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Key', 'Identifier', 'Category'];

    function KeyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Key, Identifier, Category) {
        var vm = this;

        vm.key = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.identifiers = Identifier.query();
        vm.categories = Category.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.key.id !== null) {
                Key.update(vm.key, onSaveSuccess, onSaveError);
            } else {
                Key.save(vm.key, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:keyUpdate', result);
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
