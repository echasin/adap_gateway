(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Securitygrouprule', Securitygrouprule);

    Securitygrouprule.$inject = ['$resource', 'DateUtils'];

    function Securitygrouprule ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/securitygrouprules/:id';

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
