(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioNewController', PortfolioNewController);

    PortfolioNewController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Portfolio', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype','Account'];

    function PortfolioNewController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Portfolio, Portfolioprojectmbr, Category, Subcategory, Recordtype,Account) {
        var vm = this;

        vm.portfolio = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.portfolioprojectmbrs = Portfolioprojectmbr.query();
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
            if (vm.portfolio.id !== null) {
                Portfolio.update(vm.portfolio, onSaveSuccess, onSaveError);
            } else {
            	Account.get().$promise.then(function(currentUser){
                 	vm.portfolio.domain=currentUser.data.domain
                 	vm.portfolio.lastmodifiedby=currentUser.data.lastmodifiedby;
                 	vm.portfolio.status="Active";
                 	var date= new Date();
                	vm.portfolio.lastmodifieddatetime=date;
                 	vm.portfolio.status="Active";
                    Portfolio.save(vm.portfolio, onSaveSuccess, onSaveError);
            	});
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:portfolioUpdate', result);
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
