(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('requestprojectmbr', {
            parent: 'entity',
            url: '/requestprojectmbr',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.requestprojectmbr.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbrs.html',
                    controller: 'RequestprojectmbrController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('requestprojectmbr');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('requestprojectmbr-detail', {
            parent: 'entity',
            url: '/requestprojectmbr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.requestprojectmbr.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbr-detail.html',
                    controller: 'RequestprojectmbrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('requestprojectmbr');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Requestprojectmbr', function($stateParams, Requestprojectmbr) {
                    return Requestprojectmbr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'requestprojectmbr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('requestprojectmbr-detail.edit', {
            parent: 'requestprojectmbr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbr-dialog.html',
                    controller: 'RequestprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Requestprojectmbr', function(Requestprojectmbr) {
                            return Requestprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('requestprojectmbr.new', {
            parent: 'requestprojectmbr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbr-dialog.html',
                    controller: 'RequestprojectmbrDialogController',
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
                    $state.go('requestprojectmbr', null, { reload: 'requestprojectmbr' });
                }, function() {
                    $state.go('requestprojectmbr');
                });
            }]
        })
        .state('requestprojectmbr.edit', {
            parent: 'requestprojectmbr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbr-dialog.html',
                    controller: 'RequestprojectmbrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Requestprojectmbr', function(Requestprojectmbr) {
                            return Requestprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('requestprojectmbr', null, { reload: 'requestprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('requestprojectmbr.delete', {
            parent: 'requestprojectmbr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/requestprojectmbr/requestprojectmbr-delete-dialog.html',
                    controller: 'RequestprojectmbrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Requestprojectmbr', function(Requestprojectmbr) {
                            return Requestprojectmbr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('requestprojectmbr', null, { reload: 'requestprojectmbr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
