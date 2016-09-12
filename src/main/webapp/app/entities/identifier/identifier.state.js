(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('identifier', {
            parent: 'entity',
            url: '/identifier?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.identifier.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/identifier/identifiers.html',
                    controller: 'IdentifierController',
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
                    $translatePartialLoader.addPart('identifier');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('identifier-detail', {
            parent: 'entity',
            url: '/identifier/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.identifier.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/identifier/identifier-detail.html',
                    controller: 'IdentifierDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('identifier');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Identifier', function($stateParams, Identifier) {
                    return Identifier.get({id : $stateParams.id});
                }]
            }
        })
        .state('identifier.new', {
            parent: 'identifier',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/identifier/identifier-dialog.html',
                    controller: 'IdentifierDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                type: null,
                                value: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('identifier', null, { reload: true });
                }, function() {
                    $state.go('identifier');
                });
            }]
        })
        .state('identifier.edit', {
            parent: 'identifier',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/identifier/identifier-dialog.html',
                    controller: 'IdentifierDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Identifier', function(Identifier) {
                            return Identifier.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('identifier', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('identifier.delete', {
            parent: 'identifier',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/identifier/identifier-delete-dialog.html',
                    controller: 'IdentifierDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Identifier', function(Identifier) {
                            return Identifier.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('identifier', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
