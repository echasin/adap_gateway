(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDetailController', IdentifierDetailController);

    IdentifierDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Identifier', 'Asset', 'Key'];

    function IdentifierDetailController($scope, $rootScope, $stateParams, previousState, entity, Identifier, Asset, Key) {
        var vm = this;

        vm.identifier = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:identifierUpdate', function(event, result) {
            vm.identifier = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
