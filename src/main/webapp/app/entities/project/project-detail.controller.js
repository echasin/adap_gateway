(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Project', 'Projectprojectmbr', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype'];

    function ProjectDetailController($scope, $rootScope, $stateParams, previousState, entity, Project, Projectprojectmbr, Portfolioprojectmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.project = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:projectUpdate', function(event, result) {
            vm.project = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
