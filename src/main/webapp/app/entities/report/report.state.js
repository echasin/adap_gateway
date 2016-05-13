(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('report', {
            parent: 'entity',
            url: '/report?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.report.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/report/reports.html',
                    controller: 'ReportController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('report');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('report-detail', {
            parent: 'entity',
            url: '/report/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.report.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/report/report-detail.html',
                    controller: 'ReportDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('report');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Report', function($stateParams, Report) {
                    return Report.get({id : $stateParams.id});
                }]
            }
        })
        .state('report.new', {
            parent: 'report',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/report/report-dialog.html',
                    controller: 'ReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                reporttemplatename: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: true });
                }, function() {
                    $state.go('report');
                });
            }]
        })
        .state('report.edit', {
            parent: 'report',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/report/report-dialog.html',
                    controller: 'ReportDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Report', function(Report) {
                            return Report.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('report.delete', {
            parent: 'report',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/report/report-delete-dialog.html',
                    controller: 'ReportDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Report', function(Report) {
                            return Report.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('report', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
