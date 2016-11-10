(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestDetailController', RequestDetailController);

    RequestDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Request', 'Requestprojectmbr'];

    function RequestDetailController($scope, $rootScope, $stateParams, previousState, entity, Request, Requestprojectmbr) {
        var vm = this;

        vm.request = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:requestUpdate', function(event, result) {
            vm.request = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();