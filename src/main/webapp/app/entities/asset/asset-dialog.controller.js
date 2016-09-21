(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetDialogController', AssetDialogController);

    AssetDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Asset', 'Location', 'Score', 'Category', 'Subcategory', 'Recordtype', 'Assetassetmbr'];

    function AssetDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Asset, Location, Score, Category, Subcategory, Recordtype, Assetassetmbr) {
        var vm = this;

        vm.asset = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.locations = Location.query();
        vm.scores = Score.query();
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.recordtypes = Recordtype.query();
        vm.assetassetmbrs = Assetassetmbr.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.asset.id !== null) {
                Asset.update(vm.asset, onSaveSuccess, onSaveError);
            } else {
                Asset.save(vm.asset, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:assetUpdate', result);
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
