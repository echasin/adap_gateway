(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PortfolioprojectmbrSearch', PortfolioprojectmbrSearch);

    PortfolioprojectmbrSearch.$inject = ['$resource'];

    function PortfolioprojectmbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/portfolioprojectmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
