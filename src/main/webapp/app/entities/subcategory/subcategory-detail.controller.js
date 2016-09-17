(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SubcategoryDetailController', SubcategoryDetailController);

    SubcategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Subcategory', 'Category', 'Asset'];

    function SubcategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, Subcategory, Category, Asset) {
        var vm = this;

        vm.subcategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:subcategoryUpdate', function(event, result) {
            vm.subcategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
