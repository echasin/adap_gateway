(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AlertDialogController', AlertDialogController);

    AlertDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Alert', 'Identifier'];

    function AlertDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Alert, Identifier) {
        var vm = this;
        vm.alert = entity;
        vm.identifiers = Identifier.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:alertUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.alert.id !== null) {
                Alert.update(vm.alert, onSaveSuccess, onSaveError);
            } else {
                Alert.save(vm.alert, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.startdatetime = false;
        vm.datePickerOpenStatus.enddatetime = false;
        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
