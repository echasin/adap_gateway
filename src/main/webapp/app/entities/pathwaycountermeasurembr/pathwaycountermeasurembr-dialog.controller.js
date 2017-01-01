(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaycountermeasurembrDialogController', PathwaycountermeasurembrDialogController);

    PathwaycountermeasurembrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pathwaycountermeasurembr', 'Pathway', 'Countermeasure'];

    function PathwaycountermeasurembrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pathwaycountermeasurembr, Pathway, Countermeasure) {
        var vm = this;

        vm.pathwaycountermeasurembr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.pathways = Pathway.query();
        vm.countermeasures = Countermeasure.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pathwaycountermeasurembr.id !== null) {
                Pathwaycountermeasurembr.update(vm.pathwaycountermeasurembr, onSaveSuccess, onSaveError);
            } else {
                Pathwaycountermeasurembr.save(vm.pathwaycountermeasurembr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:pathwaycountermeasurembrUpdate', result);
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
