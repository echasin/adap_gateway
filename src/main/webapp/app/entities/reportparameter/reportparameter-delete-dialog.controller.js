(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportparameterDeleteController',ReportparameterDeleteController);

    ReportparameterDeleteController.$inject = ['$uibModalInstance', 'entity', 'Reportparameter'];

    function ReportparameterDeleteController($uibModalInstance, entity, Reportparameter) {
        var vm = this;
        vm.reportparameter = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Reportparameter.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
