(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ResponseSearch', ResponseSearch);

    ResponseSearch.$inject = ['$resource'];

    function ResponseSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/responses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
