(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupruleDialogController', SecuritygroupruleDialogController);

    SecuritygroupruleDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Securitygrouprule', 'Securitygroup'];

    function SecuritygroupruleDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Securitygrouprule, Securitygroup) {
        var vm = this;

        vm.securitygrouprule = entity;
        vm.clear = clear;
        vm.save = save;
        vm.securitygroups = Securitygroup.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.securitygrouprule.id !== null) {
                Securitygrouprule.update(vm.securitygrouprule, onSaveSuccess, onSaveError);
            } else {
                Securitygrouprule.save(vm.securitygrouprule, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:securitygroupruleUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
