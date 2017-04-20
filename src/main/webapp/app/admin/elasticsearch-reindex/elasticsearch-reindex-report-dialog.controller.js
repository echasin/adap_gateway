(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ElasticsearchReindexReportDialogController', ElasticsearchReindexDialogController);

    ElasticsearchReindexDialogController.$inject = ['$uibModalInstance', 'ElasticsearchReindex'];

    function ElasticsearchReindexDialogController($uibModalInstance, ElasticsearchReindex) {
        var vm = this;

        vm.clear = clear;
        vm.confirmReindex = confirmReindex;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmReindex() {
            ElasticsearchReindex.reindexReport(function () {
                $uibModalInstance.close(true);
            });
        }
    }
})();
