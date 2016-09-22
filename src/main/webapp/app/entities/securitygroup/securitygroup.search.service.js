(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('SecuritygroupSearch', SecuritygroupSearch);

    SecuritygroupSearch.$inject = ['$resource'];

    function SecuritygroupSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/securitygroups/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
