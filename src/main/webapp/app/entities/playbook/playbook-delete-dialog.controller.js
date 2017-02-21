(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PlaybookDeleteController',PlaybookDeleteController);

    PlaybookDeleteController.$inject = ['$uibModalInstance', 'entity', 'Playbook'];

    function PlaybookDeleteController($uibModalInstance, entity, Playbook) {
        var vm = this;

        vm.playbook = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Playbook.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
