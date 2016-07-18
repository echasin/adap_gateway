(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Answer', Answer);

    Answer.$inject = ['$resource', 'DateUtils'];

    function Answer ($resource, DateUtils) {
        var resourceUrl =  'adap_assessment/' + 'api/answers/:id';

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
