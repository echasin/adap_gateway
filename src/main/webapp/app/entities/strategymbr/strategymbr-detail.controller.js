(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('StrategymbrDetailController', StrategymbrDetailController);

    StrategymbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Strategymbr', 'Strategy'];

    function StrategymbrDetailController($scope, $rootScope, $stateParams, entity, Strategymbr, Strategy) {
        var vm = this;
        vm.strategymbr = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:strategymbrUpdate', function(event, result) {
            vm.strategymbr = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
