(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PortfolioSearch', PortfolioSearch);

    PortfolioSearch.$inject = ['$resource'];

    function PortfolioSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/portfolios/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
