(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponsembrAssetDeleteController',ResponseDeleteController);

    ResponseDeleteController.$inject = ['$uibModalInstance','$mdDialog', '$location', 'Response','$stateParams','Asset'];

    
    function ResponseDeleteController($uibModalInstance,$mdDialog , $location, Response,$stateParams,Asset) {
        var vm = this;        
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.responsembr=$stateParams.rid;
        vm.confirmDelete = function () {
        	Asset.responsembrsByResponse({id:$stateParams.rid}).$promise.then(function(output){
        		if(output.length > 1){
        			Asset.deleteresponsembrsByResponse({id:$stateParams.rid})
        			showAlert();
        		}else if(output.length == 1){
        			Asset.deleteresponsembrsByResponse({id:$stateParams.rid})
        			$location.path('/asset/'+$stateParams.asset+'/deleteresponse/'+$stateParams.rid);
        		}
        		else{
        			$location.path('/asset/'+$stateParams.asset+'/deleteresponse/'+$stateParams.rid);
        		}    
    			$uibModalInstance.close(true);

        	 });
        };
        
        
        function showAlert() {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent()
            );
          };

    }
})();
