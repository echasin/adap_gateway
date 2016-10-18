(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('LogicoperatorDialogController', LogicoperatorDialogController);

    LogicoperatorDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Logicoperator', 'Question'];

    function LogicoperatorDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Logicoperator, Question) {
        var vm = this;

        vm.logicoperator = entity;
        vm.clear = clear;
        vm.save = save;
        vm.firstquestions = Question.query({filter: 'logicoperator-is-null'});
        $q.all([vm.logicoperator.$promise, vm.firstquestions.$promise]).then(function() {
            if (!vm.logicoperator.firstquestion || !vm.logicoperator.firstquestion.id) {
                return $q.reject();
            }
            return Question.get({id : vm.logicoperator.firstquestion.id}).$promise;
        }).then(function(firstquestion) {
            vm.firstquestions.push(firstquestion);
        });
        vm.secondquestions = Question.query({filter: 'logicoperator-is-null'});
        $q.all([vm.logicoperator.$promise, vm.secondquestions.$promise]).then(function() {
            if (!vm.logicoperator.secondquestion || !vm.logicoperator.secondquestion.id) {
                return $q.reject();
            }
            return Question.get({id : vm.logicoperator.secondquestion.id}).$promise;
        }).then(function(secondquestion) {
            vm.secondquestions.push(secondquestion);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.logicoperator.id !== null) {
                Logicoperator.update(vm.logicoperator, onSaveSuccess, onSaveError);
            } else {
                Logicoperator.save(vm.logicoperator, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:logicoperatorUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
