(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PathwaypathwaymbrSearch', PathwaypathwaymbrSearch);

    PathwaypathwaymbrSearch.$inject = ['$resource'];

    function PathwaypathwaymbrSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/pathwaypathwaymbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
