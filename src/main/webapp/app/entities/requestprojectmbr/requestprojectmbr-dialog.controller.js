(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestprojectmbrDialogController', RequestprojectmbrDialogController);

    RequestprojectmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Requestprojectmbr', 'Request', 'Project'];

    function RequestprojectmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Requestprojectmbr, Request, Project) {
        var vm = this;

        vm.requestprojectmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.requests = Request.query();
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.requestprojectmbr.id !== null) {
                Requestprojectmbr.update(vm.requestprojectmbr, onSaveSuccess, onSaveError);
            } else {
                Requestprojectmbr.save(vm.requestprojectmbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:requestprojectmbrUpdate', result);
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
