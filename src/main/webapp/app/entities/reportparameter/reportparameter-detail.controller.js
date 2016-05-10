(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportparameterDetailController', ReportparameterDetailController);

    ReportparameterDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Reportparameter', 'Report'];

    function ReportparameterDetailController($scope, $rootScope, $stateParams, entity, Reportparameter, Report) {
        var vm = this;
        vm.reportparameter = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:reportparameterUpdate', function(event, result) {
            vm.reportparameter = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
