(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDetailController', IdentifierDetailController);

    IdentifierDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Identifier', 'Asset'];

    function IdentifierDetailController($scope, $rootScope, $stateParams, previousState, entity, Identifier, Asset) {
        var vm = this;

        vm.identifier = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:identifierUpdate', function(event, result) {
            vm.identifier = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
