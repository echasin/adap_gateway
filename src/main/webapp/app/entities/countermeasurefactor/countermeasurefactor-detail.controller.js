(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactorDetailController', CountermeasurefactorDetailController);

    CountermeasurefactorDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Countermeasurefactor', 'Countermeasure', 'Pathway', 'Countermeasurefactortype', 'Weapon'];

    function CountermeasurefactorDetailController($scope, $rootScope, $stateParams, previousState, entity, Countermeasurefactor, Countermeasure, Pathway, Countermeasurefactortype, Weapon) {
        var vm = this;

        vm.countermeasurefactor = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:countermeasurefactorUpdate', function(event, result) {
            vm.countermeasurefactor = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
