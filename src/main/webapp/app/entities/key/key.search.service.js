(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('KeySearch', KeySearch);

    KeySearch.$inject = ['$resource'];

    function KeySearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/keys/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
