(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequeststateDeleteController',RequeststateDeleteController);

    RequeststateDeleteController.$inject = ['$uibModalInstance', 'entity', 'Requeststate'];

    function RequeststateDeleteController($uibModalInstance, entity, Requeststate) {
        var vm = this;

        vm.requeststate = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Requeststate.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
