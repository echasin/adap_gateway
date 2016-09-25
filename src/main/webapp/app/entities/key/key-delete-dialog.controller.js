(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('KeyDeleteController',KeyDeleteController);

    KeyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Key'];

    function KeyDeleteController($uibModalInstance, entity, Key) {
        var vm = this;

        vm.key = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Key.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
