(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .factory('WeaponSearch', WeaponSearch);

    WeaponSearch.$inject = ['$resource'];

    function WeaponSearch($resource) {
        var resourceUrl =  'adap_risk/' + 'api/_search/weapons/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();
