(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasureDeleteController',CountermeasureDeleteController);

    CountermeasureDeleteController.$inject = ['$uibModalInstance', 'entity', 'Countermeasure'];

    function CountermeasureDeleteController($uibModalInstance, entity, Countermeasure) {
        var vm = this;

        vm.countermeasure = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Countermeasure.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
