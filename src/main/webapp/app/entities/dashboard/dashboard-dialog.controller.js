(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('DashboardDialogController', DashboardDialogController);

    DashboardDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Dashboard'];

    function DashboardDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Dashboard) {
        var vm = this;

        vm.dashboard = entity;
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
            if (vm.dashboard.id !== null) {
                Dashboard.update(vm.dashboard, onSaveSuccess, onSaveError);
            } else {
                Dashboard.save(vm.dashboard, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:dashboardUpdate', result);
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
