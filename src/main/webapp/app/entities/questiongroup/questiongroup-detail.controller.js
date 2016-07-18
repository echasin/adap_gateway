(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestiongroupDetailController', QuestiongroupDetailController);

    QuestiongroupDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Questiongroup', 'Question', 'Questionnaire'];

    function QuestiongroupDetailController($scope, $rootScope, $stateParams, entity, Questiongroup, Question, Questionnaire) {
        var vm = this;
        vm.questiongroup = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:questiongroupUpdate', function(event, result) {
            vm.questiongroup = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
