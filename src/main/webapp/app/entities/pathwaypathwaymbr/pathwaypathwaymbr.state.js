(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pathwaypathwaymbr', {
            parent: 'entity',
            url: '/pathwaypathwaymbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.pathwaypathwaymbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbrs.html',
                    controller: 'PathwaypathwaymbrController',
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
                    $translatePartialLoader.addPart('pathwaypathwaymbr');
                    $translatePartialLoader.addPart('operator');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pathwaypathwaymbr-detail', {
            parent: 'entity',
            url: '/pathwaypathwaymbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.pathwaypathwaymbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbr-detail.html',
                    controller: 'PathwaypathwaymbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pathwaypathwaymbr');
                    $translatePartialLoader.addPart('operator');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pathwaypathwaymbr', function($stateParams, Pathwaypathwaymbr) {
                    return Pathwaypathwaymbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pathwaypathwaymbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pathwaypathwaymbr-detail.edit', {
            parent: 'pathwaypathwaymbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbr-dialog.html',
                    controller: 'PathwaypathwaymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pathwaypathwaymbr', function(Pathwaypathwaymbr) {
                            return Pathwaypathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pathwaypathwaymbr.new', {
            parent: 'pathwaypathwaymbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbr-dialog.html',
                    controller: 'PathwaypathwaymbrDialogController',
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
                                logicoperator: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pathwaypathwaymbr', null, { reload: 'pathwaypathwaymbr' });
                }, function() {
                    $state.go('pathwaypathwaymbr');
                });
            }]
        })
        .state('pathwaypathwaymbr.edit', {
            parent: 'pathwaypathwaymbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbr-dialog.html',
                    controller: 'PathwaypathwaymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pathwaypathwaymbr', function(Pathwaypathwaymbr) {
                            return Pathwaypathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pathwaypathwaymbr', null, { reload: 'pathwaypathwaymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pathwaypathwaymbr.delete', {
            parent: 'pathwaypathwaymbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pathwaypathwaymbr/pathwaypathwaymbr-delete-dialog.html',
                    controller: 'PathwaypathwaymbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pathwaypathwaymbr', function(Pathwaypathwaymbr) {
                            return Pathwaypathwaymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pathwaypathwaymbr', null, { reload: 'pathwaypathwaymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
