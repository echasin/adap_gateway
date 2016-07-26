(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('EventSearch', EventSearch);

    EventSearch.$inject = ['$resource'];

    function EventSearch($resource) {
        var resourceUrl =  'adap_event/' + 'api/_search/events/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
