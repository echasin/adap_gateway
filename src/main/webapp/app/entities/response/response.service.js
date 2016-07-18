(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Response', Response);

    Response.$inject = ['$resource', 'DateUtils'];

    function Response ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/responses/:id';

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
