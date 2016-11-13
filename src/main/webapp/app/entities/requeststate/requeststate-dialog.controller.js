(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequeststateDialogController', RequeststateDialogController);

    RequeststateDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Requeststate', 'Request'];

    function RequeststateDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Requeststate, Request) {
        var vm = this;

        vm.requeststate = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.requests = Request.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.requeststate.id !== null) {
                Requeststate.update(vm.requeststate, onSaveSuccess, onSaveError);
            } else {
                Requeststate.save(vm.requeststate, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:requeststateUpdate', result);
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
