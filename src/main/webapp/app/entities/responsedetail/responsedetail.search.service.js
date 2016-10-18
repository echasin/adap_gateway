(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ResponsedetailSearch', ResponsedetailSearch);

    ResponsedetailSearch.$inject = ['$resource'];

    function ResponsedetailSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/responsedetails/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
