(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('QuestionnaireSearch', QuestionnaireSearch);

    QuestionnaireSearch.$inject = ['$resource'];

    function QuestionnaireSearch($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/_search/questionnaires/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
