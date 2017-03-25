(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Category', Category);

    Category.$inject = ['$resource', 'DateUtils'];

    function Category ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/categories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'categoriesByRecordtype': {method: 'GET',isArray: true, url: 'adap_risk/api/categoriesByRecordtype/:id'},
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
