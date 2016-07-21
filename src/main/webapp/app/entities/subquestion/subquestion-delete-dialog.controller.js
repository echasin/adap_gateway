(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SubquestionDeleteController',SubquestionDeleteController);

    SubquestionDeleteController.$inject = ['$uibModalInstance', 'entity', 'Subquestion'];

    function SubquestionDeleteController($uibModalInstance, entity, Subquestion) {
        var vm = this;
        vm.subquestion = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Subquestion.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
