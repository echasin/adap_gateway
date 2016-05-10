(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ReportparameterSearch', ReportparameterSearch);

    ReportparameterSearch.$inject = ['$resource'];

    function ReportparameterSearch($resource) {
        var resourceUrl =  'adap_report/' + 'api/_search/reportparameters/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
