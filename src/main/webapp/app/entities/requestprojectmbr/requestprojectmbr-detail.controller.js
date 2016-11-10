(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RequestprojectmbrDetailController', RequestprojectmbrDetailController);

    RequestprojectmbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Requestprojectmbr', 'Request', 'Project'];

    function RequestprojectmbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Requestprojectmbr, Request, Project) {
        var vm = this;

        vm.requestprojectmbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:requestprojectmbrUpdate', function(event, result) {
            vm.requestprojectmbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
