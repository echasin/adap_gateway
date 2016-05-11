(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ReportparameterDialogController', ReportparameterDialogController);

    ReportparameterDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Reportparameter', 'Report'];

    function ReportparameterDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Reportparameter, Report) {
        var vm = this;
        vm.reportparameter = entity;
        vm.reports = Report.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('adapGatewayApp:reportparameterUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.reportparameter.id !== null) {
                Reportparameter.update(vm.reportparameter, onSaveSuccess, onSaveError);
            } else {
                Reportparameter.save(vm.reportparameter, onSaveSuccess, onSaveError);
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
