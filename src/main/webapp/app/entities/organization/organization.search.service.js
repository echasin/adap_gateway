(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('OrganizationSearch', OrganizationSearch);

    OrganizationSearch.$inject = ['$resource'];

    function OrganizationSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/organizations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
