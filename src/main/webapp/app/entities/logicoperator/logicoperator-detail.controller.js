(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('LogicoperatorDetailController', LogicoperatorDetailController);

    LogicoperatorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Logicoperator', 'Question'];

    function LogicoperatorDetailController($scope, $rootScope, $stateParams, entity, Logicoperator, Question) {
        var vm = this;

        vm.logicoperator = entity;

        var unsubscribe = $rootScope.$on('adapGatewayApp:logicoperatorUpdate', function(event, result) {
            vm.logicoperator = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
