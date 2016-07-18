(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseDetailController', ResponseDetailController);

    ResponseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Response', 'Questionnaire'];

    function ResponseDetailController($scope, $rootScope, $stateParams, entity, Response, Questionnaire) {
        var vm = this;
        vm.response = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:responseUpdate', function(event, result) {
            vm.response = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
