(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('LogicoperatorSearch', LogicoperatorSearch);

    LogicoperatorSearch.$inject = ['$resource'];

    function LogicoperatorSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/logicoperators/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
