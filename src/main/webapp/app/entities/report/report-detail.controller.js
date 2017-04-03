(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportDetailController', ReportDetailController);

    ReportDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Report', 'Reportparameter','$http','FileSaver'];

    function ReportDetailController($scope, $rootScope, $stateParams, entity, Report, Reportparameter,$http,FileSaver) {
        var vm = this;
        vm.report = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:reportUpdate', function(event, result) {
            vm.report = result;
        });
        $scope.$on('$destroy', unsubscribe);
        
        
        vm.generateReportWithParam=function(){
            		var jsonString = JSON.stringify(vm.parameters);            		        		
            		$http({
                          url: 'adap_report/api/generateReport/'+$stateParams.id+"/"+jsonString,
                          method: "GET",
                          headers: {
                               'Content-type': 'application/json'
                             },
                          responseType: 'arraybuffer'
                       }).success(function (data, status, headers, config) {
        	                 console.log(data)
                             var blob = new Blob([data], {type: 'application/pdf'});
        	                 FileSaver.saveAs(blob, vm.report.reporttemplatename+"."+vm.report.reportoutputtypecode);

                         }).error(function (data, status, headers, config) {
                       });
                 	
            		$('#parametersmodal').modal('hide');


        }
        
        vm.generateReport=function(){
        	Report.parameterList({reportId:$stateParams.id}).$promise.then(function(parameters){
        		if ( parameters.length  <= 0 ){
            		var jsonString = JSON.stringify(parameters);        	
                    $http({
                          url: 'adap_report/api/generateReport/'+$stateParams.id+"/"+jsonString,
                          method: "GET",
                          headers: {
                               'Content-type': 'application/json'
                             },
                          responseType: 'arraybuffer'
                       }).success(function (data, status, headers, config) {
        	                 console.log(data)
                             var blob = new Blob([data], {type: 'application/pdf'});
        	                 FileSaver.saveAs(blob, vm.report.reporttemplatename+"."+vm.report.reportoutputtypecode);

                         }).error(function (data, status, headers, config) {
                       });
                    $('#modal').modal('hide');
                }else{
            		vm.parameters=parameters;
            		$('#modal').modal('hide');
        			$('#parametersmodal').modal('show');
        		}
        	});
        }
        
        
        vm.openModal=function(){
        	$('#modal').modal('show');
        }
        
        
    }
})();
