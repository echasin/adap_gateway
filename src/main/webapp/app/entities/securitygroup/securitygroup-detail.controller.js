(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupDetailController', SecuritygroupDetailController);

    SecuritygroupDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Securitygroup', 'Securitygrouprule'];

    function SecuritygroupDetailController($scope, $rootScope, $stateParams, previousState, entity, Securitygroup, Securitygrouprule) {
        var vm = this;

        vm.securitygroup = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:securitygroupUpdate', function(event, result) {
            vm.securitygroup = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
