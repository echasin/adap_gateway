(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDeleteController',QuestionnaireDeleteController);

    QuestionnaireDeleteController.$inject = ['$uibModalInstance', 'entity', 'Questionnaire'];

    function QuestionnaireDeleteController($uibModalInstance, entity, Questionnaire) {
        var vm = this;
        vm.questionnaire = entity;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.confirmDelete = function (id) {
            Questionnaire.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };
    }
})();
