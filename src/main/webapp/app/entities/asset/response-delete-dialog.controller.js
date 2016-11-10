(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ResponseAssetDeleteController',ResponseDeleteController);

    ResponseDeleteController.$inject = ['$uibModalInstance', 'Response','$stateParams','$location'];

    function ResponseDeleteController($uibModalInstance, Response, $stateParams ,$location) {
        var vm = this;
        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        vm.response= $stateParams.rid;
        vm.confirmDelete = function () {
            Response.delete({id: $stateParams.rid},
                function () {
                    $uibModalInstance.close(true);
                });
			$location.path('/asset/'+$stateParams.asset+'/deleteresponse/'+$stateParams.rid);
        };
    }
})();
