(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Countermeasurefactortype', Countermeasurefactortype);

    Countermeasurefactortype.$inject = ['$resource', 'DateUtils'];

    function Countermeasurefactortype ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/countermeasurefactortypes/:id';

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
