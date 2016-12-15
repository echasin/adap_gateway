(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivityEditController', ActivityDialogController);

    ActivityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'Account','entity', 'Activity', 'Activitymbr','Recordtype','Project'];

    function ActivityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, Account,entity, Activity, Activitymbr, Recordtype,Project) {
        var vm = this;

        vm.activity = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.activitymbr={};
        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.activity.id !== null) {
            	   Account.get().$promise.then(function(currentUser){
            		     vm.activity.domain=currentUser.data.domain;
                    	vm.activity.lastmodifiedby=currentUser.data.lastmodifiedby;
                    	vm.activity.status="Active";
                    	var date= new Date();
                    	vm.activity.lastmodifieddatetime=date;
                    	
            		    vm.activitymbr.comment="";
               		    vm.activitymbr.domain=currentUser.data.domain;
                    	vm.activitymbr.lastmodifiedby=currentUser.data.lastmodifiedby;
                    	vm.activitymbr.status="Active";
                    	vm.activitymbr.lastmodifieddatetime=date;
                    	
                    	Activity.update(vm.activity, onSaveSuccess, onSaveError).$promise.then(function(savedActivity){
                    		Project.get({id:$stateParams.id}).$promise.then(function(proj){
                           vm.activitymbr.project=proj;
                    		vm.activitymbr.activity=savedActivity;
                       	Activitymbr.update(vm.activitymbr);
                    	});	
                   });	
                });
            } else {
                Account.get().$promise.then(function(currentUser){
                	vm.activity.domain=currentUser.data.domain;
                 	vm.activity.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.activity.status="Active";
                 	var date= new Date();
                 	vm.activity.lastmodifieddatetime=date;
                 	
                	vm.activitymbr.comment="";
            		vm.activitymbr.domain=currentUser.data.domain;
                 	vm.activitymbr.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.activitymbr.status="Active";
                 	vm.activitymbr.lastmodifieddatetime=date;
                 	
                 	
                 	Activity.save(vm.activity, onSaveSuccess, onSaveError).$promise.then(function(savedActivity){
                 		Project.get({id:$stateParams.id}).$promise.then(function(proj){
                        vm.activitymbr.project=proj;
                 		vm.activitymbr.activity=savedActivity;
                    	Activitymbr.save(vm.activitymbr);
                 	});	
                });	
             });
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:activityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.activitydatetime = false;
        vm.datePickerOpenStatus.lastmodifieddatetime = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
