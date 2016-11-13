(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Fiscalyear', Fiscalyear);

    Fiscalyear.$inject = ['$resource', 'DateUtils'];

    function Fiscalyear ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/fiscalyears/:id';

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
