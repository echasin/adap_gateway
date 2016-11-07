(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioprojectmbrDialogController', PortfolioprojectmbrDialogController);

    PortfolioprojectmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Portfolioprojectmbr', 'Portfolio', 'Project'];

    function PortfolioprojectmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Portfolioprojectmbr, Portfolio, Project) {
        var vm = this;

        vm.portfolioprojectmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.portfolios = Portfolio.query();
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.portfolioprojectmbr.id !== null) {
                Portfolioprojectmbr.update(vm.portfolioprojectmbr, onSaveSuccess, onSaveError);
            } else {
                Portfolioprojectmbr.save(vm.portfolioprojectmbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:portfolioprojectmbrUpdate', result);
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
