(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Organization', Organization);

    Organization.$inject = ['$resource', 'DateUtils'];

    function Organization ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/organizations/:id';

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
