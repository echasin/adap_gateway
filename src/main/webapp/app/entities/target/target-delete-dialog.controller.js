(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('TargetDeleteController',TargetDeleteController);

    TargetDeleteController.$inject = ['$uibModalInstance', 'entity', 'Target'];

    function TargetDeleteController($uibModalInstance, entity, Target) {
        var vm = this;

        vm.target = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Target.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
