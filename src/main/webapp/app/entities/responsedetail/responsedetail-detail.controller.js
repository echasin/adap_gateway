(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponsedetailDetailController', ResponsedetailDetailController);

    ResponsedetailDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Responsedetail'];

    function ResponsedetailDetailController($scope, $rootScope, $stateParams, entity, Responsedetail) {
        var vm = this;

        vm.responsedetail = entity;

        var unsubscribe = $rootScope.$on('adapGatewayApp:responsedetailUpdate', function(event, result) {
            vm.responsedetail = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
