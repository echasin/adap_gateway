(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivitymbrDetailController', ActivitymbrDetailController);

    ActivitymbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Activitymbr', 'Activity', 'Project', 'Asset'];

    function ActivitymbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Activitymbr, Activity, Project, Asset) {
        var vm = this;

        vm.activitymbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:activitymbrUpdate', function(event, result) {
            vm.activitymbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
