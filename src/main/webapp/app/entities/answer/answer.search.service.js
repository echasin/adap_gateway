(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('AnswerSearch', AnswerSearch);

    AnswerSearch.$inject = ['$resource'];

    function AnswerSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/answers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
