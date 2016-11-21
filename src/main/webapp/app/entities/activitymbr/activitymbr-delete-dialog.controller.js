(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivitymbrDeleteController',ActivitymbrDeleteController);

    ActivitymbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Activitymbr'];

    function ActivitymbrDeleteController($uibModalInstance, entity, Activitymbr) {
        var vm = this;

        vm.activitymbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Activitymbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
