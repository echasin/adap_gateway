(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        
        .state('asset-home-it', {
            parent: 'entity',
            url: '/asset-home-it?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.asset.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/asset-home-it.html',
                    controller: 'AssetController',
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
                    $translatePartialLoader.addPart('asset');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
 
        .state('asset-detail-it-system', {
            parent: 'entity',
            url: '/asset-it-system/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.asset.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/asset-detail-it-system.html',
                    controller: 'AssetDetailController',
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
                    $translatePartialLoader.addPart('asset');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Asset', function($stateParams, Asset) {
                    return Asset.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'asset',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        
        .state('asset', {
            parent: 'entity',
            url: '/asset?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.asset.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/assets.html',
                    controller: 'AssetController',
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
                    $translatePartialLoader.addPart('asset');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('asset-detail', {
            parent: 'entity',
            url: '/asset/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.asset.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/asset/asset-detail.html',
                    controller: 'AssetDetailController',
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
                    $translatePartialLoader.addPart('asset');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Asset', function($stateParams, Asset) {
                    return Asset.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'asset',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('asset-detail.edit', {
            parent: 'asset-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/asset-dialog.html',
                    controller: 'AssetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('asset.new', {
            parent: 'asset',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/asset-dialog.html',
                    controller: 'AssetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('asset', null, { reload: 'asset' });
                }, function() {
                    $state.go('asset');
                });
            }]
        })
        .state('asset.edit', {
            parent: 'asset',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/asset-dialog.html',
                    controller: 'AssetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('asset', null, { reload: 'asset' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('asset.delete', {
            parent: 'asset',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/asset-delete-dialog.html',
                    controller: 'AssetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Asset', function(Asset) {
                            return Asset.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('asset', null, { reload: 'asset' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('assetresponse', {
            parent: 'asset',
            url: '/{id}/newresponse',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal,$location,$scope) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/response-dialog.html',
                    controller: 'ResponseAssetDialogController',
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
                	$location.path('/asset/'+$stateParams.id);
                }, function() {
                	$location.path('/asset/'+$stateParams.id);
                });
            }]
        })
        .state('deleteresponsembr', {
            parent: 'asset',
            url: '/{asset}/deleteresponsembr/{rid}',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal,$location) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/responsembr-delete-dialog.html',
                    controller: 'ResponsembrAssetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        //entity: ['Asset', function(Asset) {
                          //  return Asset.get({id : $stateParams.id}).$promise;
                        //}]
                    }
                }).result.then(function() {
               // 	$location.path('/asset/'+$stateParams.id);
                }, function() {
                //	$location.path('/asset/'+$stateParams.id);
                });
            }]
        })
        .state('deleteresponse', {
            parent: 'asset',
            url: '/{asset}/deleteresponse/{rid}',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal,$location) {
                $uibModal.open({
                    templateUrl: 'app/entities/asset/response-delete-dialog.html',
                    controller: 'ResponseAssetDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        //entity: ['Asset', function(Asset) {
                          //  return Asset.get({id : $stateParams.id}).$promise;
                        //}]
                    }
                }).result.then(function() {
                	$location.path('/asset/'+$stateParams.asset);
                }, function() {
                	$location.path('/asset/'+$stateParams.asset);
                });
            }]
        })
         .state('editresponse', {
            parent: 'asset',
            url: '/{asset}/editresponse/{rid}',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal,$location) {
                $uibModal.open({
                	templateUrl: 'app/entities/asset/response-dialog.html',
                    controller: 'ResponseAssetDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Response', function(Response) {
                            return Response.get({id : $stateParams.rid}).$promise;
                        }]
                    }
                }).result.then(function() {
                	$location.path('/asset/'+$stateParams.asset);
                }, function() {
                	$location.path('/asset/'+$stateParams.asset);
                });
            }]
        });
    }
})();
