(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('SubquestionSearch', SubquestionSearch);

    SubquestionSearch.$inject = ['$resource'];

    function SubquestionSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/subquestions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
