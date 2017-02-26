(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenariopathwaymbrDialogController', ScenariopathwaymbrDialogController);

    ScenariopathwaymbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Scenariopathwaymbr', 'Scenario', 'Pathway'];

    function ScenariopathwaymbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Scenariopathwaymbr, Scenario, Pathway) {
        var vm = this;

        vm.scenariopathwaymbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.scenarios = Scenario.query();
        vm.pathways = Pathway.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
        	console.log(vm.scenariopathwaymbr)
            vm.isSaving = true;
            if (vm.scenariopathwaymbr.id !== null) {
                Scenariopathwaymbr.update(vm.scenariopathwaymbr, onSaveSuccess, onSaveError);
            } else {
                Scenariopathwaymbr.save(vm.scenariopathwaymbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:scenariopathwaymbrUpdate', result);
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
