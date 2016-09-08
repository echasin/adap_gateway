(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ConditionsDetailController', ConditionsDetailController);

    ConditionsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Conditions', 'Question'];

    function ConditionsDetailController($scope, $rootScope, $stateParams, entity, Conditions, Question) {
        var vm = this;

        vm.conditions = entity;

        var unsubscribe = $rootScope.$on('adapGatewayApp:conditionsUpdate', function(event, result) {
            vm.conditions = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
