(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Report', 'Reportparameter','$http'];

    function ReportDetailController($scope, $rootScope, $stateParams, entity, Report, Reportparameter,$http) {
        var vm = this;
        vm.report = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:reportUpdate', function(event, result) {
            vm.report = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.GenerateReport=function(){
        	Report.parameterList({reportId:$stateParams.id}).$promise.then(function(parameters){
        		console.log(parameters) 
        		var myJsonString = JSON.stringify(parameters);
        		console.log(myJsonString)
           	Report.GenerateReport({reportId:$stateParams.id,parameters:myJsonString});
        		console.log("444444444444444444")
        	});
        }
    }
})();
