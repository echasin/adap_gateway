(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('LogicoperatorDeleteController',LogicoperatorDeleteController);

    LogicoperatorDeleteController.$inject = ['$uibModalInstance', 'entity', 'Logicoperator'];

    function LogicoperatorDeleteController($uibModalInstance, entity, Logicoperator) {
        var vm = this;

        vm.logicoperator = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Logicoperator.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
