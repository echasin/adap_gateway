(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioDeleteController',PortfolioDeleteController);

    PortfolioDeleteController.$inject = ['$uibModalInstance', 'entity', 'Portfolio','$mdDialog'];

    function PortfolioDeleteController($uibModalInstance, entity, Portfolio , $mdDialog) {
        var vm = this;

        vm.portfolio = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
        	Portfolio.delete({'id': id},
        	 function(data) {
        		$uibModalInstance.close(true);
        	 }, function(error) {
        		 $uibModalInstance.close(true);
             	 showAlert();
        	});
        }
        
        
        function showAlert() {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Alert')
                .textContent("Can't delete Portfolio because other objects are linked to this Portfolio.")
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
                .targetEvent()
            );
          };
    }
})();
