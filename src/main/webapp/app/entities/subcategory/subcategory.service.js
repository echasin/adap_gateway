(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Subcategory', Subcategory);

    Subcategory.$inject = ['$resource', 'DateUtils'];

    function Subcategory ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/subcategories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'subCategoriesByCategory': {method: 'GET',isArray: true, url: 'adap_risk/api/subCategoriesByCategory/:id'},
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
