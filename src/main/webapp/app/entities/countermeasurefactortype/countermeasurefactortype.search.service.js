(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('CountermeasurefactortypeSearch', CountermeasurefactortypeSearch);

    CountermeasurefactortypeSearch.$inject = ['$resource'];

    function CountermeasurefactortypeSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/countermeasurefactortypes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
