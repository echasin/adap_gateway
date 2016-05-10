(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportDialogController', ReportDialogController);

    ReportDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Report', 'Reportparameter'];

    function ReportDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Report, Reportparameter) {
        var vm = this;
        vm.report = entity;
        vm.reportparameters = Reportparameter.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:reportUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.report.id !== null) {
                Report.update(vm.report, onSaveSuccess, onSaveError);
            } else {
                Report.save(vm.report, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();
