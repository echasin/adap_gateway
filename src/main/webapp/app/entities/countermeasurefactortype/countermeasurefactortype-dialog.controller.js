(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactortypeDialogController', CountermeasurefactortypeDialogController);

    CountermeasurefactortypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Countermeasurefactortype', 'Countermeasurefactor'];

    function CountermeasurefactortypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Countermeasurefactortype, Countermeasurefactor) {
        var vm = this;

        vm.countermeasurefactortype = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.countermeasurefactors = Countermeasurefactor.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.countermeasurefactortype.id !== null) {
                Countermeasurefactortype.update(vm.countermeasurefactortype, onSaveSuccess, onSaveError);
            } else {
                Countermeasurefactortype.save(vm.countermeasurefactortype, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:countermeasurefactortypeUpdate', result);
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
