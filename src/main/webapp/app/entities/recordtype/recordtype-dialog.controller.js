(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('RecordtypeDialogController', RecordtypeDialogController);

    RecordtypeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Recordtype', 'Category', 'Asset', 'Organization', 'Project', 'Portfolio', 'Request'];

    function RecordtypeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Recordtype, Category, Asset, Organization, Project, Portfolio, Request) {
        var vm = this;

        vm.recordtype = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.categories = Category.query();
        vm.assets = Asset.query();
        vm.organizations = Organization.query();
        vm.projects = Project.query();
        vm.portfolios = Portfolio.query();
        vm.requests = Request.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.recordtype.id !== null) {
                Recordtype.update(vm.recordtype, onSaveSuccess, onSaveError);
            } else {
                Recordtype.save(vm.recordtype, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:recordtypeUpdate', result);
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
