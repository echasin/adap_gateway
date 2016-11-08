(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioDetailController', PortfolioDetailController);

    PortfolioDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Portfolio', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype'];

    function PortfolioDetailController($scope, $rootScope, $stateParams, previousState, entity, Portfolio, Portfolioprojectmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.portfolio = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:portfolioUpdate', function(event, result) {
            vm.portfolio = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
