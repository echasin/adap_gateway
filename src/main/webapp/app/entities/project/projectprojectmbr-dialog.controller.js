(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectprojectDialogController', ProjectprojectmbrDialogController);

    ProjectprojectmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'Account','entity', 'Projectprojectmbr', 'Project'];

    function ProjectprojectmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, Account, entity, Projectprojectmbr, Project) {
        var vm = this;

        vm.projectprojectmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.projects = Project.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.projectprojectmbr.id !== null) {
            	Account.get().$promise.then(function(currentUser){
            		vm.projectprojectmbr.domain=currentUser.data.domain;
            		vm.projectprojectmbr.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.projectprojectmbr.status="Active";
                 	var date= new Date();
                 	vm.projectprojectmbr.lastmodifieddatetime=date;
                  Projectprojectmbr.update(vm.projectprojectmbr, onSaveSuccess, onSaveError);
                });
            } else {
            	Account.get().$promise.then(function(currentUser){
            		vm.projectprojectmbr.domain=currentUser.data.domain;
            		vm.projectprojectmbr.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.projectprojectmbr.status="Active";
                 	var date= new Date();
                 	vm.projectprojectmbr.lastmodifieddatetime=date;
                  Projectprojectmbr.save(vm.projectprojectmbr, onSaveSuccess, onSaveError);
            	 });
            	}
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:projectprojectmbrUpdate', result);
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
