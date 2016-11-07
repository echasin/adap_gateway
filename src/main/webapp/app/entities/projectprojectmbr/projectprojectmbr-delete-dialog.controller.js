(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectprojectmbrDeleteController',ProjectprojectmbrDeleteController);

    ProjectprojectmbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Projectprojectmbr'];

    function ProjectprojectmbrDeleteController($uibModalInstance, entity, Projectprojectmbr) {
        var vm = this;

        vm.projectprojectmbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Projectprojectmbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
