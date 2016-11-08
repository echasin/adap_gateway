(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectprojectmbrDialogController', ProjectprojectmbrDialogController);

    ProjectprojectmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Projectprojectmbr', 'Project', 'Category'];

    function ProjectprojectmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Projectprojectmbr, Project, Category) {
        var vm = this;

        vm.projectprojectmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.projects = Project.query();
        vm.categories = Category.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.projectprojectmbr.id !== null) {
                Projectprojectmbr.update(vm.projectprojectmbr, onSaveSuccess, onSaveError);
            } else {
                Projectprojectmbr.save(vm.projectprojectmbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:projectprojectmbrUpdate', result);
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
