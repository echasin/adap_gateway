(function () {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('elasticsearch-reindex', {
            parent: 'admin',
            url: '/elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'elasticsearch.reindex.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/elasticsearch-reindex/elasticsearch-reindex.html',
                    controller: 'ElasticsearchReindexController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('elasticsearch-reindex');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        }).state('reindexrisk', {
            parent: 'elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/admin/elasticsearch-reindex/elasticsearch-reindex-risk-dialog.html',
                    controller: 'ElasticsearchReindexRiskDialogController',
                    controllerAs: 'vm',
                    size: 'sm'
                }).result.finally(function () {
                    $state.go('^');
                });
            }]
        }).state('reindexcore', {
            parent: 'elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/admin/elasticsearch-reindex/elasticsearch-reindex-core-dialog.html',
                    controller: 'ElasticsearchReindexCoreDialogController',
                    controllerAs: 'vm',
                    size: 'sm'
                }).result.finally(function () {
                    $state.go('^');
                });
            }]
        }).state('reindexreport', {
            parent: 'elasticsearch-reindex',
            data: {
                authorities: ['ROLE_ADMIN']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/admin/elasticsearch-reindex/elasticsearch-reindex-report-dialog.html',
                    controller: 'ElasticsearchReindexReportDialogController',
                    controllerAs: 'vm',
                    size: 'sm'
                }).result.finally(function () {
                    $state.go('^');
                });
            }]
        });
    }
})();
