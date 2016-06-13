(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('StrategyDialogController', StrategyDialogController);

    StrategyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Strategy', 'Strategymbr'];

    function StrategyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Strategy, Strategymbr) {
        var vm = this;
        vm.strategy = entity;
        vm.strategymbrs = Strategymbr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:strategyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.strategy.id !== null) {
                Strategy.update(vm.strategy, onSaveSuccess, onSaveError);
            } else {
                Strategy.save(vm.strategy, onSaveSuccess, onSaveError);
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
