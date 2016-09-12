(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('alert', {
            parent: 'entity',
            url: '/alert?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.alert.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/alert/alerts.html',
                    controller: 'AlertController',
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
                    $translatePartialLoader.addPart('alert');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('alert-detail', {
            parent: 'entity',
            url: '/alert/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.alert.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/alert/alert-detail.html',
                    controller: 'AlertDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('alert');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Alert', function($stateParams, Alert) {
                    return Alert.get({id : $stateParams.id});
                }]
            }
        })
        .state('alert.new', {
            parent: 'alert',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/alert/alert-dialog.html',
                    controller: 'AlertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                category: null,
                                subcategory: null,
                                subtype: null,
                                type: null,
                                startdatetime: null,
                                enddatetime: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('alert', null, { reload: true });
                }, function() {
                    $state.go('alert');
                });
            }]
        })
        .state('alert.edit', {
            parent: 'alert',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/alert/alert-dialog.html',
                    controller: 'AlertDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Alert', function(Alert) {
                            return Alert.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('alert', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('alert.delete', {
            parent: 'alert',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/alert/alert-delete-dialog.html',
                    controller: 'AlertDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Alert', function(Alert) {
                            return Alert.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('alert', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
