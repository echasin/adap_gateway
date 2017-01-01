(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ScenariopathwaymbrSearch', ScenariopathwaymbrSearch);

    ScenariopathwaymbrSearch.$inject = ['$resource'];

    function ScenariopathwaymbrSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/scenariopathwaymbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
