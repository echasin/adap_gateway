(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDialogController', IdentifierDialogController);

    IdentifierDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Identifier', 'Asset', 'Key'];

    function IdentifierDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Identifier, Asset, Key) {
        var vm = this;

        vm.identifier = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.assets = Asset.query();
        vm.keys = Key.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.identifier.id !== null) {
                Identifier.update(vm.identifier, onSaveSuccess, onSaveError);
            } else {
                Identifier.save(vm.identifier, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:identifierUpdate', result);
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
