(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Pathwaycountermeasurembr', Pathwaycountermeasurembr);

    Pathwaycountermeasurembr.$inject = ['$resource', 'DateUtils'];

    function Pathwaycountermeasurembr ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/pathwaycountermeasurembrs/:id';

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
