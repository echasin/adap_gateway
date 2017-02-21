(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('PlaybookSearch', PlaybookSearch);

    PlaybookSearch.$inject = ['$resource'];

    function PlaybookSearch($resource) {
        var resourceUrl =  'playbook/' + 'api/_search/playbooks/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
