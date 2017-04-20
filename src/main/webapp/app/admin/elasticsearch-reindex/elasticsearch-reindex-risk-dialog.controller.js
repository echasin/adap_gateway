(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ElasticsearchReindexRiskDialogController', ElasticsearchReindexDialogController);

    ElasticsearchReindexDialogController.$inject = ['$uibModalInstance', 'ElasticsearchReindex'];

    function ElasticsearchReindexDialogController($uibModalInstance, ElasticsearchReindex) {
        var vm = this;

        vm.clear = clear;
        vm.confirmReindex = confirmReindex;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmReindex() {
            ElasticsearchReindex.reindexRisk(function () {
                $uibModalInstance.close(true);
            });
        }
    }
})();
