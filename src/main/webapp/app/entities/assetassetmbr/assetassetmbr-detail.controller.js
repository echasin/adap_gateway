(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetassetmbrDetailController', AssetassetmbrDetailController);

    AssetassetmbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Assetassetmbr', 'Asset'];

    function AssetassetmbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Assetassetmbr, Asset) {
        var vm = this;

        vm.assetassetmbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:assetassetmbrUpdate', function(event, result) {
            vm.assetassetmbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
