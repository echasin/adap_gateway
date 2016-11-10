(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseAssetDialogController', ResponseDialogController);

    ResponseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Response', 'Questionnaire','Account','User'];

    function ResponseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Response, Questionnaire,Account,User) {
        var vm = this;
        vm.response = entity;
        vm.questionnaires = Questionnaire.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:responseUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.saveResponseAndResponsembr = function () {
            vm.isSaving = true; 
            if (vm.response.id !== null) {
            	Account.get().$promise.then(function(currentUser){
                 	console.log(currentUser.data)
                 	console.log(currentUser.data.login)    
                 	vm.response.domain=currentUser.data.domain
                 	vm.response.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.response.details="{}";
                 	vm.response.status="Active";
                    Response.updateResponseAndResponsembr({id:$stateParams.rid},vm.response, onSaveSuccess, onSaveError);
            	    });
            	} else {
            	 Account.get().$promise.then(function(currentUser){
                 	console.log(currentUser.data)
                 	console.log(currentUser.data.login)    
                 	vm.response.domain=currentUser.data.domain
                 	vm.response.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.response.details="{}";
                 	vm.response.status="Active";
            	    Response.saveResponseAndResponsembr({id:$stateParams.id},vm.response,onSaveSuccess, onSaveError);
            	  });
            	}
         };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
        
    }
})();
