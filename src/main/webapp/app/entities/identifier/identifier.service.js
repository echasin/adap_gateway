(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Identifier', Identifier);

    Identifier.$inject = ['$resource', 'DateUtils'];

    function Identifier ($resource, DateUtils) {
        var resourceUrl =  'adap_event/' + 'api/identifiers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.lastmodifieddatetime = DateUtils.convertDateTimeFromServer(data.lastmodifieddatetime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
