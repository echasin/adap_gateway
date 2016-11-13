(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequeststateDetailController', RequeststateDetailController);

    RequeststateDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Requeststate', 'Request'];

    function RequeststateDetailController($scope, $rootScope, $stateParams, previousState, entity, Requeststate, Request) {
        var vm = this;

        vm.requeststate = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:requeststateUpdate', function(event, result) {
            vm.requeststate = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
