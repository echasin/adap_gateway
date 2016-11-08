(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioprojectmbrDeleteController',PortfolioprojectmbrDeleteController);

    PortfolioprojectmbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Portfolioprojectmbr'];

    function PortfolioprojectmbrDeleteController($uibModalInstance, entity, Portfolioprojectmbr) {
        var vm = this;

        vm.portfolioprojectmbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Portfolioprojectmbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
