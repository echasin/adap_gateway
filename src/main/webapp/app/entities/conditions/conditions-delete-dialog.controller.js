(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ConditionsDeleteController',ConditionsDeleteController);

    ConditionsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Conditions'];

    function ConditionsDeleteController($uibModalInstance, entity, Conditions) {
        var vm = this;

        vm.conditions = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Conditions.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
