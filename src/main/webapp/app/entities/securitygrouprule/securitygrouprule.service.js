(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Securitygrouprule', Securitygrouprule);

    Securitygrouprule.$inject = ['$resource'];

    function Securitygrouprule ($resource) {
        var resourceUrl =  'adap_core/' + 'api/securitygrouprules/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
