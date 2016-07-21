(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('QuestionSearch', QuestionSearch);

    QuestionSearch.$inject = ['$resource'];

    function QuestionSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/questions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
