(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactorDialogController', CountermeasurefactorDialogController);

    CountermeasurefactorDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Countermeasurefactor', 'Countermeasure', 'Pathway', 'Countermeasurefactortype', 'Weapon'];

    function CountermeasurefactorDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Countermeasurefactor, Countermeasure, Pathway, Countermeasurefactortype, Weapon) {
        var vm = this;

        vm.countermeasurefactor = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.countermeasures = Countermeasure.query();
        vm.pathways = Pathway.query();
        vm.countermeasurefactortypes = Countermeasurefactortype.query();
        vm.weapons = Weapon.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.countermeasurefactor.id !== null) {
                Countermeasurefactor.update(vm.countermeasurefactor, onSaveSuccess, onSaveError);
            } else {
                Countermeasurefactor.save(vm.countermeasurefactor, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:countermeasurefactorUpdate', result);
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
