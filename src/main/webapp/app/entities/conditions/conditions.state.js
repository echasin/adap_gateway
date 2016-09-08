(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('conditions', {
            parent: 'entity',
            url: '/conditions?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.conditions.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conditions/conditions.html',
                    controller: 'ConditionsController',
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
                    $translatePartialLoader.addPart('conditions');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('conditions-detail', {
            parent: 'entity',
            url: '/conditions/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.conditions.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conditions/conditions-detail.html',
                    controller: 'ConditionsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('conditions');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Conditions', function($stateParams, Conditions) {
                    return Conditions.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('conditions.new', {
            parent: 'conditions',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conditions/conditions-dialog.html',
                    controller: 'ConditionsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                action: null,
                                operator: null,
                                response: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('conditions', null, { reload: true });
                }, function() {
                    $state.go('conditions');
                });
            }]
        })
        .state('conditions.edit', {
            parent: 'conditions',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conditions/conditions-dialog.html',
                    controller: 'ConditionsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Conditions', function(Conditions) {
                            return Conditions.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conditions', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('conditions.delete', {
            parent: 'conditions',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conditions/conditions-delete-dialog.html',
                    controller: 'ConditionsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Conditions', function(Conditions) {
                            return Conditions.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conditions', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
