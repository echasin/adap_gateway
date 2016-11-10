(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('RequestprojectmbrSearch', RequestprojectmbrSearch);

    RequestprojectmbrSearch.$inject = ['$resource'];

    function RequestprojectmbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/requestprojectmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
