(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwaypathwaymbrDetailController', PathwaypathwaymbrDetailController);

    PathwaypathwaymbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pathwaypathwaymbr', 'Pathway'];

    function PathwaypathwaymbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Pathwaypathwaymbr, Pathway) {
        var vm = this;

        vm.pathwaypathwaymbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:pathwaypathwaymbrUpdate', function(event, result) {
            vm.pathwaypathwaymbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
