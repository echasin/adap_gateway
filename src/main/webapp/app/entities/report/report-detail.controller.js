(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Report', 'Reportparameter'];

    function ReportDetailController($scope, $rootScope, $stateParams, entity, Report, Reportparameter) {
        var vm = this;
        vm.report = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:reportUpdate', function(event, result) {
            vm.report = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
