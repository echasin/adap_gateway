(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('ActivityInboxController', ActivityInboxController);

    ActivityInboxController.$inject = ['$scope', '$state', 'Activity', 'ActivitySearch', 'ParseLinks', 'AlertService'];

    function ActivityInboxController ($scope, $state, Activity, ActivitySearch, ParseLinks, AlertService) {
        var vm = this;
        
      
    }
})();
