(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Request', Request);

    Request.$inject = ['$resource'];

    function Request ($resource) {
        var resourceUrl =  'adap_core/' + 'api/requests/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
