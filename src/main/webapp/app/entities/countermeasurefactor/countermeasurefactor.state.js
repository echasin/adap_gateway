(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('countermeasurefactor', {
            parent: 'entity',
            url: '/countermeasurefactor?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.countermeasurefactor.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactors.html',
                    controller: 'CountermeasurefactorController',
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
                    $translatePartialLoader.addPart('countermeasurefactor');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('countermeasurefactor-detail', {
            parent: 'entity',
            url: '/countermeasurefactor/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.countermeasurefactor.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactor-detail.html',
                    controller: 'CountermeasurefactorDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('countermeasurefactor');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Countermeasurefactor', function($stateParams, Countermeasurefactor) {
                    return Countermeasurefactor.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'countermeasurefactor',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('countermeasurefactor-detail.edit', {
            parent: 'countermeasurefactor-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactor-dialog.html',
                    controller: 'CountermeasurefactorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Countermeasurefactor', function(Countermeasurefactor) {
                            return Countermeasurefactor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countermeasurefactor.new', {
            parent: 'countermeasurefactor',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactor-dialog.html',
                    controller: 'CountermeasurefactorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                nameshort: null,
                                description: null,
                                version: null,
                                value: null,
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
                    $state.go('countermeasurefactor', null, { reload: 'countermeasurefactor' });
                }, function() {
                    $state.go('countermeasurefactor');
                });
            }]
        })
        .state('countermeasurefactor.edit', {
            parent: 'countermeasurefactor',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactor-dialog.html',
                    controller: 'CountermeasurefactorDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Countermeasurefactor', function(Countermeasurefactor) {
                            return Countermeasurefactor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countermeasurefactor', null, { reload: 'countermeasurefactor' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countermeasurefactor.delete', {
            parent: 'countermeasurefactor',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactor/countermeasurefactor-delete-dialog.html',
                    controller: 'CountermeasurefactorDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Countermeasurefactor', function(Countermeasurefactor) {
                            return Countermeasurefactor.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countermeasurefactor', null, { reload: 'countermeasurefactor' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
