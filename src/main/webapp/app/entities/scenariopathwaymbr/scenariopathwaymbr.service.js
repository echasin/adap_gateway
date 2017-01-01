(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Scenariopathwaymbr', Scenariopathwaymbr);

    Scenariopathwaymbr.$inject = ['$resource', 'DateUtils'];

    function Scenariopathwaymbr ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/scenariopathwaymbrs/:id';

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
