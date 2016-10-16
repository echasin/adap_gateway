(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationorganizationmbrDialogController', OrganizationorganizationmbrDialogController);

    OrganizationorganizationmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Organizationorganizationmbr', 'Organization', 'Category'];

    function OrganizationorganizationmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Organizationorganizationmbr, Organization, Category) {
        var vm = this;

        vm.organizationorganizationmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.organizations = Organization.query();
        vm.categories = Category.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.organizationorganizationmbr.id !== null) {
                Organizationorganizationmbr.update(vm.organizationorganizationmbr, onSaveSuccess, onSaveError);
            } else {
                Organizationorganizationmbr.save(vm.organizationorganizationmbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:organizationorganizationmbrUpdate', result);
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
