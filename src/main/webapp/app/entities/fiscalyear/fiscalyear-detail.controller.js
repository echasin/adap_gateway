(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('FiscalyearDetailController', FiscalyearDetailController);

    FiscalyearDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Fiscalyear', 'Request'];

    function FiscalyearDetailController($scope, $rootScope, $stateParams, previousState, entity, Fiscalyear, Request) {
        var vm = this;

        vm.fiscalyear = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:fiscalyearUpdate', function(event, result) {
            vm.fiscalyear = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
