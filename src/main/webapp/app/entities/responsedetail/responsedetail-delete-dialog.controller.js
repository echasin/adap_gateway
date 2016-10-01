(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponsedetailDeleteController',ResponsedetailDeleteController);

    ResponsedetailDeleteController.$inject = ['$uibModalInstance', 'entity', 'Responsedetail'];

    function ResponsedetailDeleteController($uibModalInstance, entity, Responsedetail) {
        var vm = this;

        vm.responsedetail = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Responsedetail.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
