(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponsedetailDialogController', ResponsedetailDialogController);

    ResponsedetailDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Responsedetail'];

    function ResponsedetailDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Responsedetail) {
        var vm = this;

        vm.responsedetail = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.responsedetail.id !== null) {
                Responsedetail.update(vm.responsedetail, onSaveSuccess, onSaveError);
            } else {
                Responsedetail.save(vm.responsedetail, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:responsedetailUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
