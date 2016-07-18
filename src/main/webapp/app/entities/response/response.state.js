(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('response', {
            parent: 'entity',
            url: '/response?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.response.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/response/responses.html',
                    controller: 'ResponseController',
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
                    $translatePartialLoader.addPart('response');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('response-detail', {
            parent: 'entity',
            url: '/response/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.response.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/response/response-detail.html',
                    controller: 'ResponseDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('response');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Response', function($stateParams, Response) {
                    return Response.get({id : $stateParams.id});
                }]
            }
        })
        .state('response.new', {
            parent: 'response',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-dialog.html',
                    controller: 'ResponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                details: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('response');
                });
            }]
        })
        .state('response.edit', {
            parent: 'response',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-dialog.html',
                    controller: 'ResponseDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Response', function(Response) {
                            return Response.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('response.delete', {
            parent: 'response',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/response/response-delete-dialog.html',
                    controller: 'ResponseDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Response', function(Response) {
                            return Response.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('response', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
