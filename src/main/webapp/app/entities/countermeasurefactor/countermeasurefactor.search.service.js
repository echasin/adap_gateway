(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('CountermeasurefactorSearch', CountermeasurefactorSearch);

    CountermeasurefactorSearch.$inject = ['$resource'];

    function CountermeasurefactorSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/countermeasurefactors/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
