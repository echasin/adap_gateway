(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('KeyDetailController', KeyDetailController);

    KeyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Key', 'Identifier', 'Category'];

    function KeyDetailController($scope, $rootScope, $stateParams, previousState, entity, Key, Identifier, Category) {
        var vm = this;

        vm.key = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:keyUpdate', function(event, result) {
            vm.key = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
