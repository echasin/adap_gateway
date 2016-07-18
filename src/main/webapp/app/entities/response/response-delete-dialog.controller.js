(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseDeleteController',ResponseDeleteController);

    ResponseDeleteController.$inject = ['$uibModalInstance', 'entity', 'Response'];

    function ResponseDeleteController($uibModalInstance, entity, Response) {
        var vm = this;
        vm.response = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Response.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
