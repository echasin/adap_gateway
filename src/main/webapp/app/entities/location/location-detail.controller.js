(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('LocationDetailController', LocationDetailController);

    LocationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Location', 'Asset'];

    function LocationDetailController($scope, $rootScope, $stateParams, entity, Location, Asset) {
        var vm = this;
        vm.location = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:locationUpdate', function(event, result) {
            vm.location = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
