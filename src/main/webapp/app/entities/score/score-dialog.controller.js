(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ScoreDialogController', ScoreDialogController);

    ScoreDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Score', 'Asset'];

    function ScoreDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Score, Asset) {
        var vm = this;
        vm.score = entity;
        vm.assets = Asset.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:scoreUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.score.id !== null) {
                Score.update(vm.score, onSaveSuccess, onSaveError);
            } else {
                Score.save(vm.score, onSaveSuccess, onSaveError);
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
