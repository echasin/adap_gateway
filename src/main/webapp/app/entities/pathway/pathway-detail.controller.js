(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwayDetailController', PathwayDetailController);

    PathwayDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pathway', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr', 'Pathwaypathwaymbr', 'Weapon', 'Pathwaycountermeasurembr', 'Target'];

    function PathwayDetailController($scope, $rootScope, $stateParams, previousState, entity, Pathway, Recordtype, Category, Subcategory, Scenariopathwaymbr, Pathwaypathwaymbr, Weapon, Pathwaycountermeasurembr, Target) {
        var vm = this;

        vm.pathway = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:pathwayUpdate', function(event, result) {
            vm.pathway = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
