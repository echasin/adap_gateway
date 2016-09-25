(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .controller('KeyController', KeyController);

    KeyController.$inject = ['$scope', '$state', 'Key', 'KeySearch'];

    function KeyController ($scope, $state, Key, KeySearch) {
        var vm = this;
        
        vm.keys = [];
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Key.query(function(result) {
                vm.keys = result;
            });
        }

        function search () {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            KeySearch.query({query: vm.searchQuery}, function(result) {
                vm.keys = result;
            });
        }    }
})();
