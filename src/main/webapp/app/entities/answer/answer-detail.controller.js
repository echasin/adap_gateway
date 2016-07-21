(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AnswerDetailController', AnswerDetailController);

    AnswerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Answer', 'Question'];

    function AnswerDetailController($scope, $rootScope, $stateParams, entity, Answer, Question) {
        var vm = this;
        vm.answer = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:answerUpdate', function(event, result) {
            vm.answer = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
