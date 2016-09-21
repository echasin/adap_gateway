(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetassetmbrDeleteController',AssetassetmbrDeleteController);

    AssetassetmbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Assetassetmbr'];

    function AssetassetmbrDeleteController($uibModalInstance, entity, Assetassetmbr) {
        var vm = this;

        vm.assetassetmbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Assetassetmbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
