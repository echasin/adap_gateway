(function() {
    'use strict';
    angular
        .module('adapGatewayApp')
        .factory('Asset', Asset);

    Asset.$inject = ['$resource', 'DateUtils'];

    function Asset ($resource, DateUtils) {
        var resourceUrl =  'adap_core/' + 'api/assets/:id';

        return $resource(resourceUrl, {}, {
        	'assets': { method: 'GET', isArray: true,url: 'adap_core/' + 'api/assets/'},
        	'fireWorkflows': {method: 'GET',params: {assetId: '@assetId',assetRecordType: '@assetRecordType'}, url: 'adap_workflow/' + 'api/workFlow/:assetId/:assetRecordType'},
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
