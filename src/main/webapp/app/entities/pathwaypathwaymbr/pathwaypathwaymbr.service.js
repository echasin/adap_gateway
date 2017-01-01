(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Pathwaypathwaymbr', Pathwaypathwaymbr);

    Pathwaypathwaymbr.$inject = ['$resource', 'DateUtils'];

    function Pathwaypathwaymbr ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/pathwaypathwaymbrs/:id';

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
