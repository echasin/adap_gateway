(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RecordtypeDeleteController',RecordtypeDeleteController);

    RecordtypeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Recordtype'];

    function RecordtypeDeleteController($uibModalInstance, entity, Recordtype) {
        var vm = this;

        vm.recordtype = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Recordtype.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
