(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasureDetailController', CountermeasureDetailController);

    CountermeasureDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Countermeasure', 'Recordtype', 'Category', 'Subcategory', 'Pathwaycountermeasurembr'];

    function CountermeasureDetailController($scope, $rootScope, $stateParams, previousState, entity, Countermeasure, Recordtype, Category, Subcategory, Pathwaycountermeasurembr) {
        var vm = this;

        vm.countermeasure = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:countermeasureUpdate', function(event, result) {
            vm.countermeasure = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
