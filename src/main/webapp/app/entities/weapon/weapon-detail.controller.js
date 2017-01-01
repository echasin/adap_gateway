(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('WeaponDetailController', WeaponDetailController);

    WeaponDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Weapon', 'Recordtype', 'Category', 'Subcategory', 'Pathway', 'Countermeasurefactor'];

    function WeaponDetailController($scope, $rootScope, $stateParams, previousState, entity, Weapon, Recordtype, Category, Subcategory, Pathway, Countermeasurefactor) {
        var vm = this;

        vm.weapon = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:weaponUpdate', function(event, result) {
            vm.weapon = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
