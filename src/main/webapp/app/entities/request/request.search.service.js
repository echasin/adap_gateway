(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('RequestSearch', RequestSearch);

    RequestSearch.$inject = ['$resource'];

    function RequestSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/requests/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
