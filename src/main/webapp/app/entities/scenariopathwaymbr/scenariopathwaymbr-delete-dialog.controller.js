(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScenariopathwaymbrDeleteController',ScenariopathwaymbrDeleteController);

    ScenariopathwaymbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Scenariopathwaymbr'];

    function ScenariopathwaymbrDeleteController($uibModalInstance, entity, Scenariopathwaymbr) {
        var vm = this;

        vm.scenariopathwaymbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Scenariopathwaymbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
