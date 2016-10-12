(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('logicoperator', {
            parent: 'entity',
            url: '/logicoperator?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.logicoperator.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/logicoperator/logicoperators.html',
                    controller: 'LogicoperatorController',
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
                    $translatePartialLoader.addPart('logicoperator');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('logicoperator-detail', {
            parent: 'entity',
            url: '/logicoperator/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.logicoperator.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/logicoperator/logicoperator-detail.html',
                    controller: 'LogicoperatorDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('logicoperator');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Logicoperator', function($stateParams, Logicoperator) {
                    return Logicoperator.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('logicoperator.new', {
            parent: 'logicoperator',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/logicoperator/logicoperator-dialog.html',
                    controller: 'LogicoperatorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                operator: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('logicoperator', null, { reload: true });
                }, function() {
                    $state.go('logicoperator');
                });
            }]
        })
        .state('logicoperator.edit', {
            parent: 'logicoperator',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/logicoperator/logicoperator-dialog.html',
                    controller: 'LogicoperatorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Logicoperator', function(Logicoperator) {
                            return Logicoperator.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('logicoperator', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('logicoperator.delete', {
            parent: 'logicoperator',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/logicoperator/logicoperator-delete-dialog.html',
                    controller: 'LogicoperatorDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Logicoperator', function(Logicoperator) {
                            return Logicoperator.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('logicoperator', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
