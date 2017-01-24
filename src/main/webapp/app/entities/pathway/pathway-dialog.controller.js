(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwayDialogController', PathwayDialogController);

    PathwayDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pathway', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr', 'Pathwaypathwaymbr', 'Weapon', 'Pathwaycountermeasurembr', 'Target'];

    function PathwayDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pathway, Recordtype, Category, Subcategory, Scenariopathwaymbr, Pathwaypathwaymbr, Weapon, Pathwaycountermeasurembr, Target) {
        var vm = this;

        vm.pathway = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.scenariopathwaymbrs = Scenariopathwaymbr.query();
        vm.pathwaypathwaymbrs = Pathwaypathwaymbr.query();
        vm.weapons = Weapon.query();
        vm.pathwaycountermeasurembrs = Pathwaycountermeasurembr.query();
        vm.targets = Target.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pathway.id !== null) {
                Pathway.update(vm.pathway, onSaveSuccess, onSaveError);
            } else {
                Pathway.save(vm.pathway, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:pathwayUpdate', result);
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
