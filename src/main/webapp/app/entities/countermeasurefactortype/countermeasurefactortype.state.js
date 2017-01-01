(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('countermeasurefactortype', {
            parent: 'entity',
            url: '/countermeasurefactortype?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.countermeasurefactortype.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortypes.html',
                    controller: 'CountermeasurefactortypeController',
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
                    $translatePartialLoader.addPart('countermeasurefactortype');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('countermeasurefactortype-detail', {
            parent: 'entity',
            url: '/countermeasurefactortype/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.countermeasurefactortype.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortype-detail.html',
                    controller: 'CountermeasurefactortypeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('countermeasurefactortype');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Countermeasurefactortype', function($stateParams, Countermeasurefactortype) {
                    return Countermeasurefactortype.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'countermeasurefactortype',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('countermeasurefactortype-detail.edit', {
            parent: 'countermeasurefactortype-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortype-dialog.html',
                    controller: 'CountermeasurefactortypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Countermeasurefactortype', function(Countermeasurefactortype) {
                            return Countermeasurefactortype.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countermeasurefactortype.new', {
            parent: 'countermeasurefactortype',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortype-dialog.html',
                    controller: 'CountermeasurefactortypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                nameshort: null,
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
                    $state.go('countermeasurefactortype', null, { reload: 'countermeasurefactortype' });
                }, function() {
                    $state.go('countermeasurefactortype');
                });
            }]
        })
        .state('countermeasurefactortype.edit', {
            parent: 'countermeasurefactortype',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortype-dialog.html',
                    controller: 'CountermeasurefactortypeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Countermeasurefactortype', function(Countermeasurefactortype) {
                            return Countermeasurefactortype.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countermeasurefactortype', null, { reload: 'countermeasurefactortype' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countermeasurefactortype.delete', {
            parent: 'countermeasurefactortype',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/countermeasurefactortype/countermeasurefactortype-delete-dialog.html',
                    controller: 'CountermeasurefactortypeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Countermeasurefactortype', function(Countermeasurefactortype) {
                            return Countermeasurefactortype.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countermeasurefactortype', null, { reload: 'countermeasurefactortype' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
