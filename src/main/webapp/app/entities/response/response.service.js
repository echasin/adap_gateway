(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Response', Response);

    Response.$inject = ['$resource', 'DateUtils'];

    function Response ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/responses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'responseByUserAndDateAndQuestionnaire': {method: 'GET', url: 'adap_assessment/api/responseByUserAndDateAndQuestionnaire/:id'},
            'responseByQuestionnaire': {method: 'GET', url: 'adap_assessment/api/responseByQuestionnaire/:id'},            
            'responseByUserAndQuestionnaire': {method: 'GET', isArray: true, url: 'adap_assessment/api/responseByUserAndQuestionnaire/:id'},
            'saveResponse': {method: 'PUT', url: 'adap_assessment/api/saveResponse/:id/:details'},
            'updateResponse': {method: 'PUT', url: 'adap_assessment/api/updateResponse/:id/:details'},
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
