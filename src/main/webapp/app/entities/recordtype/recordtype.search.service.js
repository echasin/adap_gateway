(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('RecordtypeSearch', RecordtypeSearch);

    RecordtypeSearch.$inject = ['$resource'];

    function RecordtypeSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/recordtypes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
