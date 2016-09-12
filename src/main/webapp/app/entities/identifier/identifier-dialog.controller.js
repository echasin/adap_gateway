(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDialogController', IdentifierDialogController);

    IdentifierDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Identifier', 'Alert', 'Event'];

    function IdentifierDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Identifier, Alert, Event) {
        var vm = this;
        vm.identifier = entity;
        vm.alerts = Alert.query();
        vm.events = Event.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:identifierUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.identifier.id !== null) {
                Identifier.update(vm.identifier, onSaveSuccess, onSaveError);
            } else {
                Identifier.save(vm.identifier, onSaveSuccess, onSaveError);
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
