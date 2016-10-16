(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationorganizationmbrDeleteController',OrganizationorganizationmbrDeleteController);

    OrganizationorganizationmbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Organizationorganizationmbr'];

    function OrganizationorganizationmbrDeleteController($uibModalInstance, entity, Organizationorganizationmbr) {
        var vm = this;

        vm.organizationorganizationmbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Organizationorganizationmbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
