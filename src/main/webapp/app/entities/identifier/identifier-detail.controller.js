(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('IdentifierDetailController', IdentifierDetailController);

    IdentifierDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Identifier', 'Alert', 'Event'];

    function IdentifierDetailController($scope, $rootScope, $stateParams, entity, Identifier, Alert, Event) {
        var vm = this;
        vm.identifier = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:identifierUpdate', function(event, result) {
            vm.identifier = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
