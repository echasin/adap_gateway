(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ProjectprojectmbrSearch', ProjectprojectmbrSearch);

    ProjectprojectmbrSearch.$inject = ['$resource'];

    function ProjectprojectmbrSearch($resource) {
        var resourceUrl =  'adap_core/' + 'api/_search/projectprojectmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
