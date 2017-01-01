(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pathwaycountermeasurembr', {
            parent: 'entity',
            url: '/pathwaycountermeasurembr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.pathwaycountermeasurembr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembrs.html',
                    controller: 'PathwaycountermeasurembrController',
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
                    $translatePartialLoader.addPart('pathwaycountermeasurembr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pathwaycountermeasurembr-detail', {
            parent: 'entity',
            url: '/pathwaycountermeasurembr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.pathwaycountermeasurembr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembr-detail.html',
                    controller: 'PathwaycountermeasurembrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pathwaycountermeasurembr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pathwaycountermeasurembr', function($stateParams, Pathwaycountermeasurembr) {
                    return Pathwaycountermeasurembr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pathwaycountermeasurembr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pathwaycountermeasurembr-detail.edit', {
            parent: 'pathwaycountermeasurembr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembr-dialog.html',
                    controller: 'PathwaycountermeasurembrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pathwaycountermeasurembr', function(Pathwaycountermeasurembr) {
                            return Pathwaycountermeasurembr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pathwaycountermeasurembr.new', {
            parent: 'pathwaycountermeasurembr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembr-dialog.html',
                    controller: 'PathwaycountermeasurembrDialogController',
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
                    $state.go('pathwaycountermeasurembr', null, { reload: 'pathwaycountermeasurembr' });
                }, function() {
                    $state.go('pathwaycountermeasurembr');
                });
            }]
        })
        .state('pathwaycountermeasurembr.edit', {
            parent: 'pathwaycountermeasurembr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembr-dialog.html',
                    controller: 'PathwaycountermeasurembrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pathwaycountermeasurembr', function(Pathwaycountermeasurembr) {
                            return Pathwaycountermeasurembr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pathwaycountermeasurembr', null, { reload: 'pathwaycountermeasurembr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pathwaycountermeasurembr.delete', {
            parent: 'pathwaycountermeasurembr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaycountermeasurembr/pathwaycountermeasurembr-delete-dialog.html',
                    controller: 'PathwaycountermeasurembrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pathwaycountermeasurembr', function(Pathwaycountermeasurembr) {
                            return Pathwaycountermeasurembr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pathwaycountermeasurembr', null, { reload: 'pathwaycountermeasurembr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
