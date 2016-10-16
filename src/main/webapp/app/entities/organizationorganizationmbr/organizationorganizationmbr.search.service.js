(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('OrganizationorganizationmbrSearch', OrganizationorganizationmbrSearch);

    OrganizationorganizationmbrSearch.$inject = ['$resource'];

    function OrganizationorganizationmbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/organizationorganizationmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
