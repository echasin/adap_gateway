(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('OrganizationDetailController', OrganizationDetailController);

    OrganizationDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Organization', 'Organizationorganizationmbr', 'Category', 'Subcategory', 'Recordtype'];

    function OrganizationDetailController($scope, $rootScope, $stateParams, previousState, entity, Organization, Organizationorganizationmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.organization = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:organizationUpdate', function(event, result) {
            vm.organization = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
