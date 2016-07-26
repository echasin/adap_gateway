(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Alert', Alert);

    Alert.$inject = ['$resource', 'DateUtils'];

    function Alert ($resource, DateUtils) {
        var resourceUrl =  'adap_event/' + 'api/alerts/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.startdatetime = DateUtils.convertDateTimeFromServer(data.startdatetime);
                        data.enddatetime = DateUtils.convertDateTimeFromServer(data.enddatetime);
                        data.lastmodifieddatetime = DateUtils.convertDateTimeFromServer(data.lastmodifieddatetime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
