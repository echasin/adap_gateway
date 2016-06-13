(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('StrategymbrSearch', StrategymbrSearch);

    StrategymbrSearch.$inject = ['$resource'];

    function StrategymbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/strategymbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
