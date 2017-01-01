(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PathwaySearch', PathwaySearch);

    PathwaySearch.$inject = ['$resource'];

    function PathwaySearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/pathways/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
