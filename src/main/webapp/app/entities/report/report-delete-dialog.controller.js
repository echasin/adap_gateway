(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportDeleteController',ReportDeleteController);

    ReportDeleteController.$inject = ['$uibModalInstance', 'entity', 'Report'];

    function ReportDeleteController($uibModalInstance, entity, Report) {
        var vm = this;
        vm.report = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Report.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
