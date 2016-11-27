(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivityInboxController', ActivityInboxController);

    ActivityInboxController.$inject = ['$scope', '$state', '$stateParams', 'Activity', 'ActivitySearch', 'Recordtype','ParseLinks', 'AlertService'];

    function ActivityInboxController ($scope, $stateParams , $state, Activity, ActivitySearch, Recordtype, ParseLinks, AlertService) {
        var vm = this;
        
        vm.activitiesBox=Activity.activitiesBox({id:$stateParams.params.id});
        vm.recordtype=Recordtype.get({id:$stateParams.params.id});
      
    }
})();
