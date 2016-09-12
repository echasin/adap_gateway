(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ConditionsDialogController', ConditionsDialogController);

    ConditionsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Conditions', 'Question'];

    function ConditionsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Conditions, Question) {
        var vm = this;

        vm.conditions = entity;
        vm.clear = clear;
        vm.save = save;
        vm.questions = Question.query();
        vm.questions = Question.query({filter: 'conditions-is-null'});
        $q.all([vm.conditions.$promise, vm.questions.$promise]).then(function() {
            if (!vm.conditions.question || !vm.conditions.question.id) {
                return $q.reject();
            }
            return Question.get({id : vm.conditions.question.id}).$promise;
        }).then(function(question) {
            vm.questions.push(question);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.conditions.id !== null) {
                Conditions.update(vm.conditions, onSaveSuccess, onSaveError);
            } else {
                Conditions.save(vm.conditions, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:conditionsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
