(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PlaybookDetailController', PlaybookDetailController);

    PlaybookDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Playbook'];

    function PlaybookDetailController($scope, $rootScope, $stateParams, previousState, entity, Playbook) {
        var vm = this;

        vm.playbook = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:playbookUpdate', function(event, result) {
            vm.playbook = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
