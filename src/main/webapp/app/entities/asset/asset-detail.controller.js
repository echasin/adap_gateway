(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetDetailController', AssetDetailController);

    AssetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Asset'];

    function AssetDetailController($scope, $rootScope, $stateParams, entity, Asset) {
        var vm = this;
        vm.asset = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:assetUpdate', function(event, result) {
            vm.asset = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
