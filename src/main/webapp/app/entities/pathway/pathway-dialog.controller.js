(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PathwayDialogController', PathwayDialogController);

    PathwayDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pathway', 'Recordtype', 'Category', 'Subcategory', 'Scenariopathwaymbr', 'Pathwaypathwaymbr', 'Weapon', 'Pathwaycountermeasurembr', 'Target','Account'];

    function PathwayDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pathway, Recordtype, Category, Subcategory, Scenariopathwaymbr, Pathwaypathwaymbr, Weapon, Pathwaycountermeasurembr, Target,Account) {
        var vm = this;

        vm.pathway = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.recordtypes = Recordtype.query();
        vm.scenariopathwaymbrs = Scenariopathwaymbr.query();
        vm.pathwaypathwaymbrs = Pathwaypathwaymbr.query();
        vm.weapons = Weapon.query();
        vm.pathwaycountermeasurembrs = Pathwaycountermeasurembr.query();
        vm.targets = Target.query();
        vm.categories=entity.categories;
        vm.subcategories=entity.subcategories;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            var lastmodifieddatetime = new Date();
            if (vm.pathway.id !== null) {
            	Account.get().$promise.then(function(currentUser){
                 	vm.pathway.domain=currentUser.data.domain
                 	vm.pathway.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.pathway.status="Active";
                 	vm.pathway.lastmodifieddatetime=lastmodifieddatetime;
                Pathway.update(vm.pathway, onSaveSuccess, onSaveError);
            	});
            } else {
            	Account.get().$promise.then(function(currentUser){
                 	vm.pathway.domain=currentUser.data.domain
                 	vm.pathway.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.pathway.status="Active";
                 	vm.pathway.lastmodifieddatetime=lastmodifieddatetime;
            	Pathway.save(vm.pathway, onSaveSuccess, onSaveError);
            	});
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:pathwayUpdate', result);
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
        
        vm.getCategories=function(id){
        	vm.categories = Category.categoriesByRecordtype({id:id});
            vm.subcategories=null;
        }
        
        vm.getSubCategories=function(id){
        	vm.subcategories=Subcategory.subCategoriesByCategory({id:vm.pathway.categories[0].id});
        	console.log(vm.subcategories);
        }
        
    }
})();
