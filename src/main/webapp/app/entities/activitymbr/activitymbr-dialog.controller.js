(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivitymbrDialogController', ActivitymbrDialogController);

    ActivitymbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Activitymbr', 'Activity', 'Project', 'Asset'];

    function ActivitymbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Activitymbr, Activity, Project, Asset) {
        var vm = this;

        vm.activitymbr = entity;
        vm.clear = clear;
        vm.save = save;
        vm.activities = Activity.query();
        vm.projects = Project.query();
        vm.assets = Asset.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.activitymbr.id !== null) {
                Activitymbr.update(vm.activitymbr, onSaveSuccess, onSaveError);
            } else {
                Activitymbr.save(vm.activitymbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:activitymbrUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
