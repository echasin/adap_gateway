(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('TargetDetailController', TargetDetailController);

    TargetDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Target', 'Recordtype', 'Category', 'Subcategory', 'Pathway'];

    function TargetDetailController($scope, $rootScope, $stateParams, previousState, entity, Target, Recordtype, Category, Subcategory, Pathway) {
        var vm = this;

        vm.target = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:targetUpdate', function(event, result) {
            vm.target = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
