(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('LocationSearch', LocationSearch);

    LocationSearch.$inject = ['$resource'];

    function LocationSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/locations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
