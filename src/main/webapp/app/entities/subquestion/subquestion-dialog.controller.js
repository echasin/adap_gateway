(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('SubquestionDialogController', SubquestionDialogController);

    SubquestionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Subquestion', 'Question'];

    function SubquestionDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Subquestion, Question) {
        var vm = this;
        vm.subquestion = entity;
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:subquestionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.subquestion.id !== null) {
                Subquestion.update(vm.subquestion, onSaveSuccess, onSaveError);
            } else {
                Subquestion.save(vm.subquestion, onSaveSuccess, onSaveError);
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
