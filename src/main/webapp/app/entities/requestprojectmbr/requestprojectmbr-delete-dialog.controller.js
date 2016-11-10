(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestprojectmbrDeleteController',RequestprojectmbrDeleteController);

    RequestprojectmbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Requestprojectmbr'];

    function RequestprojectmbrDeleteController($uibModalInstance, entity, Requestprojectmbr) {
        var vm = this;

        vm.requestprojectmbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Requestprojectmbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
