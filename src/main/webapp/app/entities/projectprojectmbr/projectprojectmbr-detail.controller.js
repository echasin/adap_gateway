(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectprojectmbrDetailController', ProjectprojectmbrDetailController);

    ProjectprojectmbrDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Projectprojectmbr', 'Project'];

    function ProjectprojectmbrDetailController($scope, $rootScope, $stateParams, previousState, entity, Projectprojectmbr, Project) {
        var vm = this;

        vm.projectprojectmbr = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:projectprojectmbrUpdate', function(event, result) {
            vm.projectprojectmbr = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
