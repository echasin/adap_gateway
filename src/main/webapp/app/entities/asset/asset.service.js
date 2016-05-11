(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Asset', Asset);

    Asset.$inject = ['$resource'];

    function Asset ($resource) {
        var resourceUrl =  'adap_core/' + 'api/assets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
