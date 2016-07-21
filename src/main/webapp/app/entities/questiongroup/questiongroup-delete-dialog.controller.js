(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestiongroupDeleteController',QuestiongroupDeleteController);

    QuestiongroupDeleteController.$inject = ['$uibModalInstance', 'entity', 'Questiongroup'];

    function QuestiongroupDeleteController($uibModalInstance, entity, Questiongroup) {
        var vm = this;
        vm.questiongroup = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Questiongroup.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
