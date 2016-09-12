(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ConditionsSearch', ConditionsSearch);

    ConditionsSearch.$inject = ['$resource'];

    function ConditionsSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/conditions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
