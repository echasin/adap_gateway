(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AlertDetailController', AlertDetailController);

    AlertDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Alert', 'Identifier'];

    function AlertDetailController($scope, $rootScope, $stateParams, entity, Alert, Identifier) {
        var vm = this;
        vm.alert = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:alertUpdate', function(event, result) {
            vm.alert = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
