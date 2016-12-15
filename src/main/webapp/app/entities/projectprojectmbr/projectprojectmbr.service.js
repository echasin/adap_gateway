(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Projectprojectmbr', Projectprojectmbr);

    Projectprojectmbr.$inject = ['$resource', 'DateUtils'];

    function Projectprojectmbr ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/projectprojectmbrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'projectprojectmbrsByProject': {method: 'GET',isArray: true, url: 'adap_core/api/projectprojectmbrsByProject/:id'},
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
