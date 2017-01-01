(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaycountermeasurembrDetailController', PathwaycountermeasurembrDetailController);

    PathwaycountermeasurembrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pathwaycountermeasurembr', 'Pathway', 'Countermeasure'];

    function PathwaycountermeasurembrDetailController($scope, $rootScope, $stateParams, previousState, entity, Pathwaycountermeasurembr, Pathway, Countermeasure) {
        var vm = this;

        vm.pathwaycountermeasurembr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:pathwaycountermeasurembrUpdate', function(event, result) {
            vm.pathwaycountermeasurembr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
