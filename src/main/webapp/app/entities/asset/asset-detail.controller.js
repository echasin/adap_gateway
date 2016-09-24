(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetDetailController', AssetDetailController);

    AssetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Asset', 'Location', 'Score', 'Category', 'Subcategory', 'Recordtype', 'Assetassetmbr', 'Securitygroup', 'Identifier'];

    function AssetDetailController($scope, $rootScope, $stateParams, previousState, entity, Asset, Location, Score, Category, Subcategory, Recordtype, Assetassetmbr, Securitygroup, Identifier) {
        var vm = this;

        vm.asset = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:assetUpdate', function(event, result) {
            vm.asset = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
