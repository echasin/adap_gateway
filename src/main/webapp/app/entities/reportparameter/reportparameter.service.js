(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Reportparameter', Reportparameter);

    Reportparameter.$inject = ['$resource', 'DateUtils'];

    function Reportparameter ($resource, DateUtils) {
        var resourceUrl =  'adap_report/' + 'api/reportparameters/:id';

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
