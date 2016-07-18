(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AnswerDialogController', AnswerDialogController);

    AnswerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Answer', 'Question'];

    function AnswerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Answer, Question) {
        var vm = this;
        vm.answer = entity;
        vm.questions = Question.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:answerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.answer.id !== null) {
                Answer.update(vm.answer, onSaveSuccess, onSaveError);
            } else {
                Answer.save(vm.answer, onSaveSuccess, onSaveError);
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
