(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioprojectmbrDetailController', PortfolioprojectmbrDetailController);

    PortfolioprojectmbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Portfolioprojectmbr', 'Portfolio', 'Project'];

    function PortfolioprojectmbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Portfolioprojectmbr, Portfolio, Project) {
        var vm = this;

        vm.portfolioprojectmbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:portfolioprojectmbrUpdate', function(event, result) {
            vm.portfolioprojectmbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
