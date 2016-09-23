(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupDialogController', SecuritygroupDialogController);

    SecuritygroupDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Securitygroup', 'Securitygrouprule', 'Asset'];

    function SecuritygroupDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Securitygroup, Securitygrouprule, Asset) {
        var vm = this;

        vm.securitygroup = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.securitygrouprules = Securitygrouprule.query();
        vm.assets = Asset.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.securitygroup.id !== null) {
                Securitygroup.update(vm.securitygroup, onSaveSuccess, onSaveError);
            } else {
                Securitygroup.save(vm.securitygroup, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:securitygroupUpdate', result);
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
