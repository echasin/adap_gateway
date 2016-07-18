(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionDetailController', QuestionDetailController);

    QuestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Question', 'Questiongroup', 'Answer', 'Subquestion'];

    function QuestionDetailController($scope, $rootScope, $stateParams, entity, Question, Questiongroup, Answer, Subquestion) {
        var vm = this;
        vm.question = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:questionUpdate', function(event, result) {
            vm.question = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
