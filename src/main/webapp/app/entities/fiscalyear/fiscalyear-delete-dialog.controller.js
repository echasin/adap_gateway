(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('FiscalyearDeleteController',FiscalyearDeleteController);

    FiscalyearDeleteController.$inject = ['$uibModalInstance', 'entity', 'Fiscalyear'];

    function FiscalyearDeleteController($uibModalInstance, entity, Fiscalyear) {
        var vm = this;

        vm.fiscalyear = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Fiscalyear.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
