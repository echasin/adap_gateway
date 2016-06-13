(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('strategymbr', {
            parent: 'entity',
            url: '/strategymbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.strategymbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/strategymbr/strategymbrs.html',
                    controller: 'StrategymbrController',
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
                    $translatePartialLoader.addPart('strategymbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('strategymbr-detail', {
            parent: 'entity',
            url: '/strategymbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.strategymbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/strategymbr/strategymbr-detail.html',
                    controller: 'StrategymbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('strategymbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Strategymbr', function($stateParams, Strategymbr) {
                    return Strategymbr.get({id : $stateParams.id});
                }]
            }
        })
        .state('strategymbr.new', {
            parent: 'strategymbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/strategymbr/strategymbr-dialog.html',
                    controller: 'StrategymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('strategymbr', null, { reload: true });
                }, function() {
                    $state.go('strategymbr');
                });
            }]
        })
        .state('strategymbr.edit', {
            parent: 'strategymbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/strategymbr/strategymbr-dialog.html',
                    controller: 'StrategymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Strategymbr', function(Strategymbr) {
                            return Strategymbr.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('strategymbr', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('strategymbr.delete', {
            parent: 'strategymbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/strategymbr/strategymbr-delete-dialog.html',
                    controller: 'StrategymbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Strategymbr', function(Strategymbr) {
                            return Strategymbr.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('strategymbr', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
