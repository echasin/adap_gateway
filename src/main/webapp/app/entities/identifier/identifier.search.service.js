(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('IdentifierSearch', IdentifierSearch);

    IdentifierSearch.$inject = ['$resource'];

    function IdentifierSearch($resource) {
        var resourceUrl =  'adap_event/' + 'api/_search/identifiers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
