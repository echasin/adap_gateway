(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RecordtypeDetailController', RecordtypeDetailController);

    RecordtypeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Recordtype', 'Category', 'Asset', 'Organization', 'Project', 'Portfolio', 'Request'];

    function RecordtypeDetailController($scope, $rootScope, $stateParams, previousState, entity, Recordtype, Category, Asset, Organization, Project, Portfolio, Request) {
        var vm = this;

        vm.recordtype = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('adapGatewayApp:recordtypeUpdate', function(event, result) {
            vm.recordtype = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
