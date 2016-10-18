(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseDetailController', ResponseDetailController);

    ResponseDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Response', 'Questionnaire','Responsedetail'];

    function ResponseDetailController($scope, $rootScope, $stateParams, entity, Response, Questionnaire,Responsedetail) {
        var vm = this;
        vm.response = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:responseUpdate', function(event, result) {
            vm.response = result;
        });
        $scope.$on('$destroy', unsubscribe);

        vm.saveResponseDetail=function(){
        	Responsedetail.saveResponseDetail({id:$stateParams.id});
        }
        
    }
})();
