(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Questionnaire', Questionnaire);

    Questionnaire.$inject = ['$resource', 'DateUtils'];

    function Questionnaire ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/questionnaires/:id';

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
