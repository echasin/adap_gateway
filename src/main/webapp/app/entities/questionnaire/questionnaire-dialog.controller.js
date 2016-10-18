(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('QuestionnaireDialogController', QuestionnaireDialogController);

    QuestionnaireDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Questionnaire', 'Questiongroup'];

    function QuestionnaireDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Questionnaire, Questiongroup) {
        var vm = this;

        vm.questionnaire = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.questiongroups = Questiongroup.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.questionnaire.id !== null) {
                Questionnaire.update(vm.questionnaire, onSaveSuccess, onSaveError);
            } else {
                Questionnaire.save(vm.questionnaire, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:questionnaireUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
