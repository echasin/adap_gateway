(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('PortfolioEditController', PortfolioEditController);

    PortfolioEditController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Portfolio', 'Portfolioprojectmbr', 'Category', 'Subcategory', 'Recordtype'];

    function PortfolioEditController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Portfolio, Portfolioprojectmbr, Category, Subcategory, Recordtype) {
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
                Portfolio.save(vm.portfolio, onSaveSuccess, onSaveError);
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
