(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Scenario', Scenario);

    Scenario.$inject = ['$resource', 'DateUtils'];

    function Scenario ($resource, DateUtils) {
        var resourceUrl =  'adap_risk/' + 'api/scenarios/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'getRoot': {method: 'GET',
            	transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.lastmodifieddatetime = DateUtils.convertDateTimeFromServer(data.lastmodifieddatetime);
                    }
                    return data;
                },	
            
            	url: 'adap_risk/api/getRoot/:id'},
            'getData': {method: 'GET',isArray: true, url: 'adap_risk/api/getData/:id'},
            'getPathway': {method: 'GET',isArray: true, url: 'adap_risk/api/getPathway/:id'},
            'getCounterMeasure': {method: 'GET', url: 'adap_risk/api/getCounterMeasure/:id'},
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
