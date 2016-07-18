(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SubquestionDetailController', SubquestionDetailController);

    SubquestionDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Subquestion', 'Question'];

    function SubquestionDetailController($scope, $rootScope, $stateParams, entity, Subquestion, Question) {
        var vm = this;
        vm.subquestion = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:subquestionUpdate', function(event, result) {
            vm.subquestion = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
