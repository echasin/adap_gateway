(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('QuestiongroupSearch', QuestiongroupSearch);

    QuestiongroupSearch.$inject = ['$resource'];

    function QuestiongroupSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/questiongroups/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
