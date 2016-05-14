(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Report', Report);

    Report.$inject = ['$resource', 'DateUtils'];

    function Report ($resource, DateUtils) {
        var resourceUrl =  'adap_report/' + 'api/reports/:id';

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
