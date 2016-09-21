(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('AssetassetmbrDialogController', AssetassetmbrDialogController);

    AssetassetmbrDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Assetassetmbr', 'Asset'];

    function AssetassetmbrDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Assetassetmbr, Asset) {
        var vm = this;

        vm.assetassetmbr = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.assets = Asset.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.assetassetmbr.id !== null) {
                Assetassetmbr.update(vm.assetassetmbr, onSaveSuccess, onSaveError);
            } else {
                Assetassetmbr.save(vm.assetassetmbr, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('adapGatewayApp:assetassetmbrUpdate', result);
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
