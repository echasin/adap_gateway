(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('DashboardSearch', DashboardSearch);

    DashboardSearch.$inject = ['$resource'];

    function DashboardSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/dashboards/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
