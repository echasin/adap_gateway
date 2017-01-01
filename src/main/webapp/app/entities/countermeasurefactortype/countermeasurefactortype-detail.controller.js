(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CountermeasurefactortypeDetailController', CountermeasurefactortypeDetailController);

    CountermeasurefactortypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Countermeasurefactortype', 'Countermeasurefactor'];

    function CountermeasurefactortypeDetailController($scope, $rootScope, $stateParams, previousState, entity, Countermeasurefactortype, Countermeasurefactor) {
        var vm = this;

        vm.countermeasurefactortype = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:countermeasurefactortypeUpdate', function(event, result) {
            vm.countermeasurefactortype = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
