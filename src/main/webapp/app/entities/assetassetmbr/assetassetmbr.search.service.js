(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('AssetassetmbrSearch', AssetassetmbrSearch);

    AssetassetmbrSearch.$inject = ['$resource'];

    function AssetassetmbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/assetassetmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
