(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Asset', Asset);

    Asset.$inject = ['$resource', 'DateUtils'];

    function Asset ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/assets/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'responsembrsByResponse': {method: 'GET',isArray: true, url: 'adap_assessment/api/responsembrsByResponse/:id'},            
            'deleteresponsembrsByResponse': {method: 'GET',isArray: true, url: 'adap_assessment/api/deleteresponsembrsByResponse/:id'},            
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
