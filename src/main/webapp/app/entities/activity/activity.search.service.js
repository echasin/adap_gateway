(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ActivitySearch', ActivitySearch);

    ActivitySearch.$inject = ['$resource'];

    function ActivitySearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/activities/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
