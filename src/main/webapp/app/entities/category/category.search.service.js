(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('CategorySearch', CategorySearch);

    CategorySearch.$inject = ['$resource'];

    function CategorySearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/categories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
