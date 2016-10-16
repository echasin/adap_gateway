(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('organizationorganizationmbr', {
            parent: 'entity',
            url: '/organizationorganizationmbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.organizationorganizationmbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbrs.html',
                    controller: 'OrganizationorganizationmbrController',
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
                    $translatePartialLoader.addPart('organizationorganizationmbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('organizationorganizationmbr-detail', {
            parent: 'entity',
            url: '/organizationorganizationmbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.organizationorganizationmbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbr-detail.html',
                    controller: 'OrganizationorganizationmbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('organizationorganizationmbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Organizationorganizationmbr', function($stateParams, Organizationorganizationmbr) {
                    return Organizationorganizationmbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'organizationorganizationmbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('organizationorganizationmbr-detail.edit', {
            parent: 'organizationorganizationmbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbr-dialog.html',
                    controller: 'OrganizationorganizationmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Organizationorganizationmbr', function(Organizationorganizationmbr) {
                            return Organizationorganizationmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('organizationorganizationmbr.new', {
            parent: 'organizationorganizationmbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbr-dialog.html',
                    controller: 'OrganizationorganizationmbrDialogController',
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
                    $state.go('organizationorganizationmbr', null, { reload: 'organizationorganizationmbr' });
                }, function() {
                    $state.go('organizationorganizationmbr');
                });
            }]
        })
        .state('organizationorganizationmbr.edit', {
            parent: 'organizationorganizationmbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbr-dialog.html',
                    controller: 'OrganizationorganizationmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Organizationorganizationmbr', function(Organizationorganizationmbr) {
                            return Organizationorganizationmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('organizationorganizationmbr', null, { reload: 'organizationorganizationmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('organizationorganizationmbr.delete', {
            parent: 'organizationorganizationmbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/organizationorganizationmbr/organizationorganizationmbr-delete-dialog.html',
                    controller: 'OrganizationorganizationmbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Organizationorganizationmbr', function(Organizationorganizationmbr) {
                            return Organizationorganizationmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('organizationorganizationmbr', null, { reload: 'organizationorganizationmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
