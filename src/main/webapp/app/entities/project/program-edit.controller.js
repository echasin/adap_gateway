(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProgramEditController', ProgramEditController);

    ProgramEditController.$inject = ['$timeout', '$scope', '$stateParams', 'entity', 'Project', 'Projectprojectmbr', 'Portfolioprojectmbr', 'Requestprojectmbr', 'Category', 'Subcategory', 'Recordtype'];

    function ProgramEditController ($timeout, $scope, $stateParams, entity, Project, Projectprojectmbr, Portfolioprojectmbr, Requestprojectmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.project = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.projectprojectmbrs = Projectprojectmbr.query();
        vm.portfolioprojectmbrs = Portfolioprojectmbr.query();
        vm.requestprojectmbrs = Requestprojectmbr.query();
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
            if (vm.project.id !== null) {
                Project.update(vm.project, onSaveSuccess, onSaveError);
            } else {
                Project.save(vm.project, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:projectUpdate', result);
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
