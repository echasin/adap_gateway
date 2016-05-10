(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Reportparameter', Reportparameter);

    Reportparameter.$inject = ['$resource'];

    function Reportparameter ($resource) {
        var resourceUrl =  'adap_report/' + 'api/reportparameters/:id';

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
