(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ElasticsearchReindexCoreDialogController', ElasticsearchReindexDialogController);

    ElasticsearchReindexDialogController.$inject = ['$uibModalInstance', 'ElasticsearchReindex'];

    function ElasticsearchReindexDialogController($uibModalInstance, ElasticsearchReindex) {
        var vm = this;

        vm.clear = clear;
        vm.confirmReindex = confirmReindex;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmReindex() {
            ElasticsearchReindex.reindexCore(function () {
                $uibModalInstance.close(true);
            });
        }
    }
})();
