(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('StrategySearch', StrategySearch);

    StrategySearch.$inject = ['$resource'];

    function StrategySearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/strategies/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
