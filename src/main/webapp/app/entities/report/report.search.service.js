(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ReportSearch', ReportSearch);

    ReportSearch.$inject = ['$resource'];

    function ReportSearch($resource) {
        var resourceUrl =  'adap_report/' + 'api/_search/reports/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
