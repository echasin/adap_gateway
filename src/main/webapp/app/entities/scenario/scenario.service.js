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
            'getColor': {method: 'GET', url: 'adap_risk/api/getColor/:recordtype',transformResponse: function(data, headersGetter, status) {
                return {content: data};}},
            'getPathway': {method: 'GET',isArray: true, url: 'adap_risk/api/getPathway/:pathwayId/:scenarioId'},
            'getPathways': {method: 'GET',isArray: true, url: 'adap_risk/api/getPathways'},
            'getCounterMeasure': {method: 'GET', url: 'adap_risk/api/getCounterMeasure/:id'},
            'getLineData': {method: 'GET', url: 'adap_risk/api/getLineData/:scenarioId/:parentId/:childId'},
            'removeLine': {method: 'GET', url: 'adap_risk/api/removeLine/:scenarioId/:parentId/:childId'},
            'removePathwayCountermeasure': {method: 'GET', url: 'adap_risk/api/removePathwayCountermeasure/:scenarioId/:pathwayId/:countermeasureId'},
            'removeRoot': {method: 'GET', url: 'adap_risk/api/removeRoot/:scenarioId/:pathwayId'},
            'getPathwayByRecordtype': {method: 'GET',isArray: true, url: 'adap_risk/api/pathwayByRecordtype/:name'},
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
