(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CategoryDialogController', CategoryDialogController);

    CategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Category', 'Recordtype', 'Subcategory', 'Asset', 'Organization', 'Organizationorganizationmbr', 'Key', 'Project'];

    function CategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Category, Recordtype, Subcategory, Asset, Organization, Organizationorganizationmbr, Key, Project) {
        var vm = this;

        vm.category = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.subcategories = Subcategory.query();
        vm.assets = Asset.query();
        vm.organizations = Organization.query();
        vm.organizationorganizationmbrs = Organizationorganizationmbr.query();
        vm.keys = Key.query();
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.category.id !== null) {
                Category.update(vm.category, onSaveSuccess, onSaveError);
            } else {
                Category.save(vm.category, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:categoryUpdate', result);
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
