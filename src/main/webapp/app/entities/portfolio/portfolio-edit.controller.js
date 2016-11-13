(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioEditController', PortfolioEditController);

    PortfolioEditController.$inject = ['$timeout','$location', '$scope', '$stateParams', 'entity', 'Portfolio', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype','Account'];

    function PortfolioEditController ($timeout,$location, $scope, $stateParams, entity, Portfolio, Portfolioprojectmbr, Category, Subcategory, Recordtype,Account) {
        var vm = this;

        vm.portfolio = entity;
        vm.cancel = cancel;
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

        function cancel () {
            $location.path("portfolio-home");
        }

        
        function save() {
        	Account.get().$promise.then(function(currentUser){
             	vm.portfolio.domain=currentUser.data.domain
             	vm.portfolio.lastmodifiedby=currentUser.data.lastmodifiedby;
             	vm.portfolio.status="Active";
                Portfolio.update(vm.portfolio, onSaveSuccess, onSaveError);
        	});
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:portfolioUpdate', result);
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
