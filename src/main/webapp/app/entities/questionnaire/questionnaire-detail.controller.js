(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDetailController', QuestionnaireDetailController);

    QuestionnaireDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Questionnaire', 'Questiongroup'];

    function QuestionnaireDetailController($scope, $rootScope, $stateParams, entity, Questionnaire, Questiongroup) {
        var vm = this;

        vm.questionnaire = entity;

        var unsubscribe = $rootScope.$on('adapGatewayApp:questionnaireUpdate', function(event, result) {
            vm.questionnaire = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
