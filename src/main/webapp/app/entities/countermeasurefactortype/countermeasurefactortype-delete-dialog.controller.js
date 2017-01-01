(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactortypeDeleteController',CountermeasurefactortypeDeleteController);

    CountermeasurefactortypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Countermeasurefactortype'];

    function CountermeasurefactortypeDeleteController($uibModalInstance, entity, Countermeasurefactortype) {
        var vm = this;

        vm.countermeasurefactortype = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Countermeasurefactortype.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
