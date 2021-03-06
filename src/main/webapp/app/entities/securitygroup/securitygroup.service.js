(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Securitygroup', Securitygroup);

    Securitygroup.$inject = ['$resource', 'DateUtils'];

    function Securitygroup ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/securitygroups/:id';

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
