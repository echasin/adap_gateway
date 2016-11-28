(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ProgramEditController', ProgramEditController);

    ProgramEditController.$inject = ['$timeout', '$scope', '$stateParams', 'entity', 'Project', 'Projectprojectmbr', 'Portfolioprojectmbr', 'Requestprojectmbr', 'Category', 'Subcategory', 'Recordtype','Activity'];

    function ProgramEditController ($timeout, $scope, $stateParams, entity, Project, Projectprojectmbr, Portfolioprojectmbr, Requestprojectmbr, Category, Subcategory, Recordtype , Activity) {
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

        function save () {
            vm.isSaving = true;
            if (vm.project.id !== null) {
                Project.update(vm.project, onSaveSuccess, onSaveError);
            } else {
                Project.save(vm.project, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:projectUpdate', result);
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
        
        
        Activity.activitiesByProject({id:$stateParams.id}).$promise.then(function(activity){         	
        	for(var x=0;x<activity.length;x++){
        		(function(index) {
    			    setTimeout(function() {
        		if(activity[index].recordtype.id==30000){
        			activity[index].color="yellow-bg";
            		activity[index].icon="fa fa-key";
        		}if(activity[index].recordtype.id==30001){
        			activity[index].color="lazur-bg";
            		activity[index].icon="fa fa-dollar";
        		}if(activity[index].recordtype.id==30002){
        			activity[index].color="yellow-bg";
            		activity[index].icon="fa fa-comments";
        		}if(activity[index].recordtype.id==30003){
        			activity[index].color="blue-bg";
            		activity[index].icon="fa fa-tasks";
        		}
    			    });
  			  })(x); 
        	}
        	vm.activities=activity;
        });
        
    }
})();
