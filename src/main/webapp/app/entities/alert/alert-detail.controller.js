(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AlertDetailController', AlertDetailController);

    AlertDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Alert', 'Identifier','$http'];

    function AlertDetailController($scope, $rootScope, $stateParams, entity, Alert, Identifier,$http) {
        var vm = this;
        vm.alert = entity;
        
        var unsubscribe = $rootScope.$on('adapGatewayApp:alertUpdate', function(event, result) {
            vm.alert = result;
        });
        $scope.$on('$destroy', unsubscribe);

        $scope.addAlert = function() {
    		return $http.post('adap_event/' + 'api/alerttojms', vm.alert).success(authenticateSuccess);
    		function authenticateSuccess (result) {
    			console.log(result);
            }
    		};

    }
})();
