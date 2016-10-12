(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Conditions', Conditions);

    Conditions.$inject = ['$resource'];

    function Conditions ($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/conditions/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'conditionsByQuestionnaire': {method: 'GET',isArray: true, url: 'adap_assessment/api/conditionsByQuestionnaire/:id'},
            'conditionByQuestion': {method: 'GET', url: 'adap_assessment/api/conditionByQuestion/:id'},
            'conditionBySubquestion': {method: 'GET', url: 'adap_assessment/api/conditionBySubquestion/:id'},
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