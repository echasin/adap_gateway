(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Subquestion', Subquestion);

    Subquestion.$inject = ['$resource', 'DateUtils'];

    function Subquestion ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/subquestions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'subquestionsByQuestion': {method: 'GET',isArray: true, url: 'adap_assessment/api/subquestionsByQuestion/:id'},
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
