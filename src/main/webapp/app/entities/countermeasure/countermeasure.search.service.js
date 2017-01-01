(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('CountermeasureSearch', CountermeasureSearch);

    CountermeasureSearch.$inject = ['$resource'];

    function CountermeasureSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/countermeasures/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
