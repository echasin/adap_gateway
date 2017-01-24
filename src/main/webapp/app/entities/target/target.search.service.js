(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('TargetSearch', TargetSearch);

    TargetSearch.$inject = ['$resource'];

    function TargetSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/targets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
