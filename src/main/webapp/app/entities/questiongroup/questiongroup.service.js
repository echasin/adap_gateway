(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Questiongroup', Questiongroup);

    Questiongroup.$inject = ['$resource', 'DateUtils'];

    function Questiongroup ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/questiongroups/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'questiongroupsByQuestionnaire': {method: 'GET',isArray: true, url: 'adap_assessment/api/questiongroupsByQuestionnaire/:id'},
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
