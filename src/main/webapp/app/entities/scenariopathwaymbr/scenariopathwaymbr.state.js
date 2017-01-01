(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('scenariopathwaymbr', {
            parent: 'entity',
            url: '/scenariopathwaymbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.scenariopathwaymbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbrs.html',
                    controller: 'ScenariopathwaymbrController',
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
                    $translatePartialLoader.addPart('scenariopathwaymbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('scenariopathwaymbr-detail', {
            parent: 'entity',
            url: '/scenariopathwaymbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.scenariopathwaymbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbr-detail.html',
                    controller: 'ScenariopathwaymbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('scenariopathwaymbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Scenariopathwaymbr', function($stateParams, Scenariopathwaymbr) {
                    return Scenariopathwaymbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'scenariopathwaymbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('scenariopathwaymbr-detail.edit', {
            parent: 'scenariopathwaymbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbr-dialog.html',
                    controller: 'ScenariopathwaymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Scenariopathwaymbr', function(Scenariopathwaymbr) {
                            return Scenariopathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('scenariopathwaymbr.new', {
            parent: 'scenariopathwaymbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbr-dialog.html',
                    controller: 'ScenariopathwaymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                comment: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('scenariopathwaymbr', null, { reload: 'scenariopathwaymbr' });
                }, function() {
                    $state.go('scenariopathwaymbr');
                });
            }]
        })
        .state('scenariopathwaymbr.edit', {
            parent: 'scenariopathwaymbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbr-dialog.html',
                    controller: 'ScenariopathwaymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Scenariopathwaymbr', function(Scenariopathwaymbr) {
                            return Scenariopathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('scenariopathwaymbr', null, { reload: 'scenariopathwaymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('scenariopathwaymbr.delete', {
            parent: 'scenariopathwaymbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/scenariopathwaymbr/scenariopathwaymbr-delete-dialog.html',
                    controller: 'ScenariopathwaymbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Scenariopathwaymbr', function(Scenariopathwaymbr) {
                            return Scenariopathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('scenariopathwaymbr', null, { reload: 'scenariopathwaymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
