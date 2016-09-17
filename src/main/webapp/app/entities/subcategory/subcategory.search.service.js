(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('SubcategorySearch', SubcategorySearch);

    SubcategorySearch.$inject = ['$resource'];

    function SubcategorySearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/subcategories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
