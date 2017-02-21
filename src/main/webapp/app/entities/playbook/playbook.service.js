(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Playbook', Playbook);

    Playbook.$inject = ['$resource', 'DateUtils'];

    function Playbook ($resource, DateUtils) {
        var resourceUrl =  'playbook/' + 'api/playbooks/:id';

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
