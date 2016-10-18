(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Responsedetail', Responsedetail);

    Responsedetail.$inject = ['$resource'];

    function Responsedetail ($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/responsedetails/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'saveResponseDetail': {method: 'GET', url: 'adap_assessment/api/saveResponseDetail/:id'},
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
