(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ElasticsearchReindex', ElasticsearchReindex);

    ElasticsearchReindex.$inject = ['$resource'];

    function ElasticsearchReindex($resource) {
        var service = $resource('api/elasticsearch/index', {}, {
            'reindex': {method: 'POST'},
            'reindexRisk': {method: 'POST', url: 'adap_risk/api/elasticsearch/index'},
            'reindexCore': {method: 'POST', url: 'adap_core/api/elasticsearch/index'},
            'reindexReport': {method: 'POST', url: 'adap_report/api/elasticsearch/index'}
        });

        return service;
    }
})();
