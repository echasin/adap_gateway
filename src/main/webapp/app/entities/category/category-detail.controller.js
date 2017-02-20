(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Category', 'Recordtype', 'Subcategory', 'Asset', 'Organization', 'Organizationorganizationmbr', 'Project'];

    function CategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, Category, Recordtype, Subcategory, Asset, Organization, Organizationorganizationmbr, Project) {
        var vm = this;

        vm.category = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:categoryUpdate', function(event, result) {
            vm.category = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
