(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Logicoperator', Logicoperator);

    Logicoperator.$inject = ['$resource'];

    function Logicoperator ($resource) {
        var resourceUrl =  'adap_assessment/' + 'api/logicoperators/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'logicoperatorByQuestionnaire': {method: 'GET',isArray: true, url: 'adap_assessment/api/logicoperatorByQuestionnaire/:id'},
            'logicoperatorByFirstquestionOrSecondquestion': {method: 'GET',isArray: true, url: 'adap_assessment/api/logicoperatorByFirstquestionOrSecondquestion/:id'},
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
