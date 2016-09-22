(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupruleDeleteController',SecuritygroupruleDeleteController);

    SecuritygroupruleDeleteController.$inject = ['$uibModalInstance', 'entity', 'Securitygrouprule'];

    function SecuritygroupruleDeleteController($uibModalInstance, entity, Securitygrouprule) {
        var vm = this;

        vm.securitygrouprule = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Securitygrouprule.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
