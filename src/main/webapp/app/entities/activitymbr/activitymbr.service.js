(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Activitymbr', Activitymbr);

    Activitymbr.$inject = ['$resource'];

    function Activitymbr ($resource) {
        var resourceUrl =  'adap_core/' + 'api/activitymbrs/:id';

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
