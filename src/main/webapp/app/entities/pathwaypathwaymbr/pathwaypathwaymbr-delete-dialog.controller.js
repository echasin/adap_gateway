(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaypathwaymbrDeleteController',PathwaypathwaymbrDeleteController);

    PathwaypathwaymbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pathwaypathwaymbr'];

    function PathwaypathwaymbrDeleteController($uibModalInstance, entity, Pathwaypathwaymbr) {
        var vm = this;

        vm.pathwaypathwaymbr = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pathwaypathwaymbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
