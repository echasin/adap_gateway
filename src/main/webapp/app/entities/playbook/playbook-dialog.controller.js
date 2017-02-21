(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PlaybookDialogController', PlaybookDialogController);

    PlaybookDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Playbook'];

    function PlaybookDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Playbook) {
        var vm = this;

        vm.playbook = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.playbook.id !== null) {
                Playbook.update(vm.playbook, onSaveSuccess, onSaveError);
            } else {
                Playbook.save(vm.playbook, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:playbookUpdate', result);
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
