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

    
        vm.generateReport=function(){
        	Report.parameterList({reportId:$stateParams.id}).$promise.then(function(parameters){
        		if ( parameters.length  <= 0 ){
        			console.log(parameters) 
            		var jsonString = JSON.stringify(parameters);
            		console.log(jsonString)
                 	Report.generateReport({reportId:$stateParams.id,parameters:jsonString});
        		}else{
            		vm.parameters=parameters;
        			$('#parametersmodal').modal('show');
        		}
        });
        }
        
        
        vm.generateReportWithParam=function(){
            		var jsonString = JSON.stringify(vm.parameters);
            		console.log(vm.parameters)
                 	Report.generateReport({reportId:$stateParams.id,parameters:jsonString});
            		$('#parametersmodal').modal('hide');


        }
        
        
        
        
    }
})();
