(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDeleteController',IdentifierDeleteController);

    IdentifierDeleteController.$inject = ['$uibModalInstance', 'entity', 'Identifier'];

    function IdentifierDeleteController($uibModalInstance, entity, Identifier) {
        var vm = this;
        vm.identifier = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Identifier.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
