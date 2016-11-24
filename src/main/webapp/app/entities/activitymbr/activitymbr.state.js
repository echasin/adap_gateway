(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('activitymbr', {
            parent: 'entity',
            url: '/activitymbr',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.activitymbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/activitymbr/activitymbrs.html',
                    controller: 'ActivitymbrController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('activitymbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('activitymbr-detail', {
            parent: 'entity',
            url: '/activitymbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.activitymbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/activitymbr/activitymbr-detail.html',
                    controller: 'ActivitymbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('activitymbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Activitymbr', function($stateParams, Activitymbr) {
                    return Activitymbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'activitymbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('activitymbr-detail.edit', {
            parent: 'activitymbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activitymbr/activitymbr-dialog.html',
                    controller: 'ActivitymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Activitymbr', function(Activitymbr) {
                            return Activitymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('activitymbr.new', {
            parent: 'activitymbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activitymbr/activitymbr-dialog.html',
                    controller: 'ActivitymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('activitymbr', null, { reload: 'activitymbr' });
                }, function() {
                    $state.go('activitymbr');
                });
            }]
        })
        .state('activitymbr.edit', {
            parent: 'activitymbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activitymbr/activitymbr-dialog.html',
                    controller: 'ActivitymbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Activitymbr', function(Activitymbr) {
                            return Activitymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('activitymbr', null, { reload: 'activitymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('activitymbr.delete', {
            parent: 'activitymbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activitymbr/activitymbr-delete-dialog.html',
                    controller: 'ActivitymbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Activitymbr', function(Activitymbr) {
                            return Activitymbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('activitymbr', null, { reload: 'activitymbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
