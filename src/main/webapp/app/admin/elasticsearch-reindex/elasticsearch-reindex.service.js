(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('ElasticsearchReindex', ElasticsearchReindex);

    ElasticsearchReindex.$inject = ['$resource'];

    function ElasticsearchReindex($resource) {
        var service = $resource('api/elasticsearch/index', {}, {
            'reindex': {method: 'POST'},
            'reindexAll': {method: 'POST', url: 'adap_risk/api/elasticsearch/index'},
        });

        return service;
    }
})();
