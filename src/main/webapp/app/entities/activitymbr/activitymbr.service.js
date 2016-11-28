(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Activitymbr', Activitymbr);

    Activitymbr.$inject = ['$resource', 'DateUtils'];

    function Activitymbr ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/activitymbrs/:id';

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
