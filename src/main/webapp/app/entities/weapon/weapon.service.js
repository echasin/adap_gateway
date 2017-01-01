(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Weapon', Weapon);

    Weapon.$inject = ['$resource', 'DateUtils'];

    function Weapon ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/weapons/:id';

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
