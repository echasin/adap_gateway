(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ScenarioSearch', ScenarioSearch);

    ScenarioSearch.$inject = ['$resource'];

    function ScenarioSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/scenarios/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
