(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('SecuritygroupruleSearch', SecuritygroupruleSearch);

    SecuritygroupruleSearch.$inject = ['$resource'];

    function SecuritygroupruleSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/securitygrouprules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
