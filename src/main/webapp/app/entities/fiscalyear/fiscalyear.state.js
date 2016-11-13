(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('fiscalyear', {
            parent: 'entity',
            url: '/fiscalyear?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.fiscalyear.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fiscalyear/fiscalyears.html',
                    controller: 'FiscalyearController',
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
                    $translatePartialLoader.addPart('fiscalyear');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('fiscalyear-detail', {
            parent: 'entity',
            url: '/fiscalyear/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.fiscalyear.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fiscalyear/fiscalyear-detail.html',
                    controller: 'FiscalyearDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fiscalyear');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Fiscalyear', function($stateParams, Fiscalyear) {
                    return Fiscalyear.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'fiscalyear',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('fiscalyear-detail.edit', {
            parent: 'fiscalyear-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fiscalyear/fiscalyear-dialog.html',
                    controller: 'FiscalyearDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fiscalyear', function(Fiscalyear) {
                            return Fiscalyear.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fiscalyear.new', {
            parent: 'fiscalyear',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fiscalyear/fiscalyear-dialog.html',
                    controller: 'FiscalyearDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                value: null,
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
                    $state.go('fiscalyear', null, { reload: 'fiscalyear' });
                }, function() {
                    $state.go('fiscalyear');
                });
            }]
        })
        .state('fiscalyear.edit', {
            parent: 'fiscalyear',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fiscalyear/fiscalyear-dialog.html',
                    controller: 'FiscalyearDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fiscalyear', function(Fiscalyear) {
                            return Fiscalyear.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fiscalyear', null, { reload: 'fiscalyear' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fiscalyear.delete', {
            parent: 'fiscalyear',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fiscalyear/fiscalyear-delete-dialog.html',
                    controller: 'FiscalyearDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Fiscalyear', function(Fiscalyear) {
                            return Fiscalyear.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fiscalyear', null, { reload: 'fiscalyear' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
