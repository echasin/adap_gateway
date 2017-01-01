(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Pathway', Pathway);

    Pathway.$inject = ['$resource', 'DateUtils'];

    function Pathway ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/pathways/:id';

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
