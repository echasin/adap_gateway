(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenarioDialogController', ScenarioDialogController);

    ScenarioDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Scenario', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr'];

    function ScenarioDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Scenario, Recordtype, Category, Subcategory, Scenariopathwaymbr) {
        var vm = this;

        vm.scenario = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.scenariopathwaymbrs = Scenariopathwaymbr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            console.log("////////////////////")
            console.log(vm.scenario);
            console.log("///////////////55")
            if (vm.scenario.id !== null) {
                Scenario.update(vm.scenario, onSaveSuccess, onSaveError);
            } else {
                Scenario.save(vm.scenario, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:scenarioUpdate', result);
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
