(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactorDeleteController',CountermeasurefactorDeleteController);

    CountermeasurefactorDeleteController.$inject = ['$uibModalInstance', 'entity', 'Countermeasurefactor'];

    function CountermeasurefactorDeleteController($uibModalInstance, entity, Countermeasurefactor) {
        var vm = this;

        vm.countermeasurefactor = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Countermeasurefactor.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
