(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('assetassetmbr', {
            parent: 'entity',
            url: '/assetassetmbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.assetassetmbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbrs.html',
                    controller: 'AssetassetmbrController',
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
                    $translatePartialLoader.addPart('assetassetmbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('assetassetmbr-detail', {
            parent: 'entity',
            url: '/assetassetmbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.assetassetmbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbr-detail.html',
                    controller: 'AssetassetmbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('assetassetmbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Assetassetmbr', function($stateParams, Assetassetmbr) {
                    return Assetassetmbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'assetassetmbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('assetassetmbr-detail.edit', {
            parent: 'assetassetmbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbr-dialog.html',
                    controller: 'AssetassetmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Assetassetmbr', function(Assetassetmbr) {
                            return Assetassetmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('assetassetmbr.new', {
            parent: 'assetassetmbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbr-dialog.html',
                    controller: 'AssetassetmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
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
                    $state.go('assetassetmbr', null, { reload: 'assetassetmbr' });
                }, function() {
                    $state.go('assetassetmbr');
                });
            }]
        })
        .state('assetassetmbr.edit', {
            parent: 'assetassetmbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbr-dialog.html',
                    controller: 'AssetassetmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Assetassetmbr', function(Assetassetmbr) {
                            return Assetassetmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('assetassetmbr', null, { reload: 'assetassetmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('assetassetmbr.delete', {
            parent: 'assetassetmbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/assetassetmbr/assetassetmbr-delete-dialog.html',
                    controller: 'AssetassetmbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Assetassetmbr', function(Assetassetmbr) {
                            return Assetassetmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('assetassetmbr', null, { reload: 'assetassetmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
