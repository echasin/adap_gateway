(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('StrategymbrDeleteController',StrategymbrDeleteController);

    StrategymbrDeleteController.$inject = ['$uibModalInstance', 'entity', 'Strategymbr'];

    function StrategymbrDeleteController($uibModalInstance, entity, Strategymbr) {
        var vm = this;
        vm.strategymbr = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Strategymbr.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
