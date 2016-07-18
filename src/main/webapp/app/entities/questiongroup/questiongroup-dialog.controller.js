(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestiongroupDialogController', QuestiongroupDialogController);

    QuestiongroupDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Questiongroup', 'Question', 'Questionnaire'];

    function QuestiongroupDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Questiongroup, Question, Questionnaire) {
        var vm = this;
        vm.questiongroup = entity;
        vm.questions = Question.query();
        vm.questionnaires = Questionnaire.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:questiongroupUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.questiongroup.id !== null) {
                Questiongroup.update(vm.questiongroup, onSaveSuccess, onSaveError);
            } else {
                Questiongroup.save(vm.questiongroup, onSaveSuccess, onSaveError);
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
