(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('AlertSearch', AlertSearch);

    AlertSearch.$inject = ['$resource'];

    function AlertSearch($resource) {
        var resourceUrl =  'adap_event/' + 'api/_search/alerts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
