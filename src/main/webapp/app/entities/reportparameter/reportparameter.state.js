(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('reportparameter', {
            parent: 'entity',
            url: '/reportparameter?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.reportparameter.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reportparameter/reportparameters.html',
                    controller: 'ReportparameterController',
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
                    $translatePartialLoader.addPart('reportparameter');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('reportparameter-detail', {
            parent: 'entity',
            url: '/reportparameter/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.reportparameter.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/reportparameter/reportparameter-detail.html',
                    controller: 'ReportparameterDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('reportparameter');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Reportparameter', function($stateParams, Reportparameter) {
                    return Reportparameter.get({id : $stateParams.id});
                }]
            }
        })
        .state('reportparameter.new', {
            parent: 'reportparameter',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reportparameter/reportparameter-dialog.html',
                    controller: 'ReportparameterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                label: null,
                                lastmodifiedby: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('reportparameter', null, { reload: true });
                }, function() {
                    $state.go('reportparameter');
                });
            }]
        })
        .state('reportparameter.edit', {
            parent: 'reportparameter',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reportparameter/reportparameter-dialog.html',
                    controller: 'ReportparameterDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Reportparameter', function(Reportparameter) {
                            return Reportparameter.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('reportparameter', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('reportparameter.delete', {
            parent: 'reportparameter',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/reportparameter/reportparameter-delete-dialog.html',
                    controller: 'ReportparameterDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Reportparameter', function(Reportparameter) {
                            return Reportparameter.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('reportparameter', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
