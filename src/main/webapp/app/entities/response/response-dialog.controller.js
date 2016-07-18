(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseDialogController', ResponseDialogController);

    ResponseDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Response', 'Questionnaire'];

    function ResponseDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Response, Questionnaire) {
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

        vm.save = function () {
            vm.isSaving = true;
            if (vm.response.id !== null) {
                Response.update(vm.response, onSaveSuccess, onSaveError);
            } else {
                Response.save(vm.response, onSaveSuccess, onSaveError);
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
