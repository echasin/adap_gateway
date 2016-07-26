(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Event', 'Identifier'];

    function EventDetailController($scope, $rootScope, $stateParams, entity, Event, Identifier) {
        var vm = this;
        vm.event = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:eventUpdate', function(event, result) {
            vm.event = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
