(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationDialogController', OrganizationDialogController);

    OrganizationDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Organization', 'Organizationorganizationmbr', 'Category', 'Subcategory', 'Recordtype'];

    function OrganizationDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Organization, Organizationorganizationmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.organization = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.organizationorganizationmbrs = Organizationorganizationmbr.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.recordtypes = Recordtype.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.organization.id !== null) {
                Organization.update(vm.organization, onSaveSuccess, onSaveError);
            } else {
                Organization.save(vm.organization, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:organizationUpdate', result);
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
