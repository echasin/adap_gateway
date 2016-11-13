(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('FiscalyearDialogController', FiscalyearDialogController);

    FiscalyearDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Fiscalyear', 'Request'];

    function FiscalyearDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Fiscalyear, Request) {
        var vm = this;

        vm.fiscalyear = entity;
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
            if (vm.fiscalyear.id !== null) {
                Fiscalyear.update(vm.fiscalyear, onSaveSuccess, onSaveError);
            } else {
                Fiscalyear.save(vm.fiscalyear, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:fiscalyearUpdate', result);
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
