(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SubcategoryDialogController', SubcategoryDialogController);

    SubcategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Subcategory', 'Category', 'Asset', 'Organization', 'Project'];

    function SubcategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Subcategory, Category, Asset, Organization, Project) {
        var vm = this;

        vm.subcategory = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.categories = Category.query();
        vm.assets = Asset.query();
        vm.organizations = Organization.query();
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.subcategory.id !== null) {
                Subcategory.update(vm.subcategory, onSaveSuccess, onSaveError);
            } else {
                Subcategory.save(vm.subcategory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:subcategoryUpdate', result);
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
