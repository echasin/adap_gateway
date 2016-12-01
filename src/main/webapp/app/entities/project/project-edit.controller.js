(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProjectEditController', ProjectEditController);

    ProjectEditController.$inject = ['$timeout', '$scope', '$stateParams', '$location','Account' ,'entity', 'Project', 'Projectprojectmbr', 'Portfolioprojectmbr', 'Requestprojectmbr', 'Category', 'Subcategory', 'Recordtype'];

    function ProjectEditController ($timeout, $scope, $stateParams, $location,Account, entity, Project, Projectprojectmbr, Portfolioprojectmbr, Requestprojectmbr, Category, Subcategory, Recordtype) {
        var vm = this;

        vm.project = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.projectprojectmbrs = Projectprojectmbr.query();
        vm.portfolioprojectmbrs = Portfolioprojectmbr.query();
        vm.requestprojectmbrs = Requestprojectmbr.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.recordtypes = Recordtype.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }


        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:projectUpdate', result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
        
        function save() {
        	Account.get().$promise.then(function(currentUser){
             	vm.project.domain=currentUser.data.domain
             	vm.project.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.project.status="Active";
             	Project.update(vm.project, onSaveSuccess, onSaveError);
        	});
        }
        
        function cancel () {
            $location.path("portfolio-edit"+$stateParams.id);
        }

        
    }
})();
