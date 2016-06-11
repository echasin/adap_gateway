(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScoreDetailController', ScoreDetailController);

    ScoreDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Score', 'Asset'];

    function ScoreDetailController($scope, $rootScope, $stateParams, entity, Score, Asset) {
        var vm = this;
        vm.score = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:scoreUpdate', function(event, result) {
            vm.score = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
