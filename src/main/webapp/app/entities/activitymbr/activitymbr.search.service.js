(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ActivitymbrSearch', ActivitymbrSearch);

    ActivitymbrSearch.$inject = ['$resource'];

    function ActivitymbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/activitymbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
