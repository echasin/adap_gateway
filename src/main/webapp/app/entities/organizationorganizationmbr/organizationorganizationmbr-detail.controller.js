(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationorganizationmbrDetailController', OrganizationorganizationmbrDetailController);

    OrganizationorganizationmbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Organizationorganizationmbr', 'Organization'];

    function OrganizationorganizationmbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Organizationorganizationmbr, Organization) {
        var vm = this;

        vm.organizationorganizationmbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:organizationorganizationmbrUpdate', function(event, result) {
            vm.organizationorganizationmbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
