(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('AssetSearch', AssetSearch);

    AssetSearch.$inject = ['$resource'];

    function AssetSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/assets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
