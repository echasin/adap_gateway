(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaycountermeasurembrDeleteController',PathwaycountermeasurembrDeleteController);

    PathwaycountermeasurembrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pathwaycountermeasurembr'];

    function PathwaycountermeasurembrDeleteController($uibModalInstance, entity, Pathwaycountermeasurembr) {
        var vm = this;

        vm.pathwaycountermeasurembr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pathwaycountermeasurembr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
