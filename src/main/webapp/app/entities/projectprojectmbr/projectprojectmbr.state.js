(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('projectprojectmbr', {
            parent: 'entity',
            url: '/projectprojectmbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.projectprojectmbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbrs.html',
                    controller: 'ProjectprojectmbrController',
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
                    $translatePartialLoader.addPart('projectprojectmbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('projectprojectmbr-detail', {
            parent: 'entity',
            url: '/projectprojectmbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.projectprojectmbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbr-detail.html',
                    controller: 'ProjectprojectmbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('projectprojectmbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Projectprojectmbr', function($stateParams, Projectprojectmbr) {
                    return Projectprojectmbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'projectprojectmbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('projectprojectmbr-detail.edit', {
            parent: 'projectprojectmbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbr-dialog.html',
                    controller: 'ProjectprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Projectprojectmbr', function(Projectprojectmbr) {
                            return Projectprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('projectprojectmbr.new', {
            parent: 'projectprojectmbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbr-dialog.html',
                    controller: 'ProjectprojectmbrDialogController',
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
                    $state.go('projectprojectmbr', null, { reload: 'projectprojectmbr' });
                }, function() {
                    $state.go('projectprojectmbr');
                });
            }]
        })
        .state('projectprojectmbr.edit', {
            parent: 'projectprojectmbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbr-dialog.html',
                    controller: 'ProjectprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Projectprojectmbr', function(Projectprojectmbr) {
                            return Projectprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('projectprojectmbr', null, { reload: 'projectprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('projectprojectmbr.delete', {
            parent: 'projectprojectmbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/projectprojectmbr/projectprojectmbr-delete-dialog.html',
                    controller: 'ProjectprojectmbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Projectprojectmbr', function(Projectprojectmbr) {
                            return Projectprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('projectprojectmbr', null, { reload: 'projectprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
