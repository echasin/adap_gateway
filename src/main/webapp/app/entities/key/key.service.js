(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Key', Key);

    Key.$inject = ['$resource', 'DateUtils'];

    function Key ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/keys/:id';

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
