(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('WeaponDeleteController',WeaponDeleteController);

    WeaponDeleteController.$inject = ['$uibModalInstance', 'entity', 'Weapon'];

    function WeaponDeleteController($uibModalInstance, entity, Weapon) {
        var vm = this;

        vm.weapon = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Weapon.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
