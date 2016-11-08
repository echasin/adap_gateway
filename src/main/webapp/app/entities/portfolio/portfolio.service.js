(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Portfolio', Portfolio);

    Portfolio.$inject = ['$resource', 'DateUtils'];

    function Portfolio ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/portfolios/:id';

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
