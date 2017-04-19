(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ElasticsearchReindexDialogController', ElasticsearchReindexDialogController);

    ElasticsearchReindexDialogController.$inject = ['$uibModalInstance', 'ElasticsearchReindex'];

    function ElasticsearchReindexDialogController($uibModalInstance, ElasticsearchReindex) {
        var vm = this;

        vm.clear = clear;
        vm.confirmReindex = confirmReindex;

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmReindex() {
            ElasticsearchReindex.reindexAll(function () {
                $uibModalInstance.close(true);
            });
        }
    }
})();
