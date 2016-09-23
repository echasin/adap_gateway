(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SecuritygroupruleDetailController', SecuritygroupruleDetailController);

    SecuritygroupruleDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Securitygrouprule', 'Securitygroup'];

    function SecuritygroupruleDetailController($scope, $rootScope, $stateParams, previousState, entity, Securitygrouprule, Securitygroup) {
        var vm = this;

        vm.securitygrouprule = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:securitygroupruleUpdate', function(event, result) {
            vm.securitygrouprule = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
