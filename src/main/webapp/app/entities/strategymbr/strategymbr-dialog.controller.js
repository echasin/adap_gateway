(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('StrategymbrDialogController', StrategymbrDialogController);

    StrategymbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Strategymbr', 'Strategy'];

    function StrategymbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Strategymbr, Strategy) {
        var vm = this;
        vm.strategymbr = entity;
        vm.strategies = Strategy.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:strategymbrUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.strategymbr.id !== null) {
                Strategymbr.update(vm.strategymbr, onSaveSuccess, onSaveError);
            } else {
                Strategymbr.save(vm.strategymbr, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
