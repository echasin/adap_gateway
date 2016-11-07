(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Dashboard', Dashboard);

    Dashboard.$inject = ['$resource', 'DateUtils'];

    function Dashboard ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/dashboards/:id';

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
