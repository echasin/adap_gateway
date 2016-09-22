(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupDeleteController',SecuritygroupDeleteController);

    SecuritygroupDeleteController.$inject = ['$uibModalInstance', 'entity', 'Securitygroup'];

    function SecuritygroupDeleteController($uibModalInstance, entity, Securitygroup) {
        var vm = this;

        vm.securitygroup = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Securitygroup.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
