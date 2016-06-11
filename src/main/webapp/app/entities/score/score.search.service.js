(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ScoreSearch', ScoreSearch);

    ScoreSearch.$inject = ['$resource'];

    function ScoreSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/scores/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
