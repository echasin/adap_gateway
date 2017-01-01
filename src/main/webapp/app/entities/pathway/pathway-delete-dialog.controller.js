(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwayDeleteController',PathwayDeleteController);

    PathwayDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pathway'];

    function PathwayDeleteController($uibModalInstance, entity, Pathway) {
        var vm = this;

        vm.pathway = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pathway.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
