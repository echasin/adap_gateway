(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetDetailController', AssetDetailController);

    AssetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Asset', 'Location', 'Score'];

    function AssetDetailController($scope, $rootScope, $stateParams, entity, Asset, Location, Score) {
        var vm = this;
        vm.asset = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:assetUpdate', function(event, result) {
            vm.asset = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
