(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('RequeststateSearch', RequeststateSearch);

    RequeststateSearch.$inject = ['$resource'];

    function RequeststateSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/requeststates/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
