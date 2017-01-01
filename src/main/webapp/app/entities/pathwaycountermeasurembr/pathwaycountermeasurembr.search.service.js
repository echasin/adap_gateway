(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PathwaycountermeasurembrSearch', PathwaycountermeasurembrSearch);

    PathwaycountermeasurembrSearch.$inject = ['$resource'];

    function PathwaycountermeasurembrSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/pathwaycountermeasurembrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
