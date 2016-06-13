(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('StrategyDetailController', StrategyDetailController);

    StrategyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Strategy', 'Strategymbr'];

    function StrategyDetailController($scope, $rootScope, $stateParams, entity, Strategy, Strategymbr) {
        var vm = this;
        vm.strategy = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:strategyUpdate', function(event, result) {
            vm.strategy = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
