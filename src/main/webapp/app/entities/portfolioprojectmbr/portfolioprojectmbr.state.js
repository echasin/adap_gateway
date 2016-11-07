(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('portfolioprojectmbr', {
            parent: 'entity',
            url: '/portfolioprojectmbr?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolioprojectmbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbrs.html',
                    controller: 'PortfolioprojectmbrController',
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
                    $translatePartialLoader.addPart('portfolioprojectmbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('portfolioprojectmbr-detail', {
            parent: 'entity',
            url: '/portfolioprojectmbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolioprojectmbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbr-detail.html',
                    controller: 'PortfolioprojectmbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('portfolioprojectmbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Portfolioprojectmbr', function($stateParams, Portfolioprojectmbr) {
                    return Portfolioprojectmbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'portfolioprojectmbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('portfolioprojectmbr-detail.edit', {
            parent: 'portfolioprojectmbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbr-dialog.html',
                    controller: 'PortfolioprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolioprojectmbr', function(Portfolioprojectmbr) {
                            return Portfolioprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolioprojectmbr.new', {
            parent: 'portfolioprojectmbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbr-dialog.html',
                    controller: 'PortfolioprojectmbrDialogController',
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
                    $state.go('portfolioprojectmbr', null, { reload: 'portfolioprojectmbr' });
                }, function() {
                    $state.go('portfolioprojectmbr');
                });
            }]
        })
        .state('portfolioprojectmbr.edit', {
            parent: 'portfolioprojectmbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbr-dialog.html',
                    controller: 'PortfolioprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolioprojectmbr', function(Portfolioprojectmbr) {
                            return Portfolioprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolioprojectmbr', null, { reload: 'portfolioprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolioprojectmbr.delete', {
            parent: 'portfolioprojectmbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolioprojectmbr/portfolioprojectmbr-delete-dialog.html',
                    controller: 'PortfolioprojectmbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Portfolioprojectmbr', function(Portfolioprojectmbr) {
                            return Portfolioprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolioprojectmbr', null, { reload: 'portfolioprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
