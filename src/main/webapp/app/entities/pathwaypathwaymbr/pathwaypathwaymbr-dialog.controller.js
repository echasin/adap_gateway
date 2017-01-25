(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaypathwaymbrDialogController', PathwaypathwaymbrDialogController);

    PathwaypathwaymbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pathwaypathwaymbr', 'Pathway', 'Scenario'];

    function PathwaypathwaymbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pathwaypathwaymbr, Pathway, Scenario) {
        var vm = this;

        vm.pathwaypathwaymbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.pathways = Pathway.query();
        vm.scenarios = Scenario.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pathwaypathwaymbr.id !== null) {
                Pathwaypathwaymbr.update(vm.pathwaypathwaymbr, onSaveSuccess, onSaveError);
            } else {
                Pathwaypathwaymbr.save(vm.pathwaypathwaymbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:pathwaypathwaymbrUpdate', result);
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
