(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('FiscalyearSearch', FiscalyearSearch);

    FiscalyearSearch.$inject = ['$resource'];

    function FiscalyearSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/fiscalyears/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
