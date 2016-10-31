(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dashboard', {
            parent: 'entity',
            url: '/dashboard',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.dashboard.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dashboard/dashboards.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dashboard');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
           .state('dashboard.dashboard1', {
            parent: 'entity',
            url: '/dashboard1',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.dashboard.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dashboard/dashboard1.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            	  loadPlugin: function ($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          {

                              serie: true,
                              name: 'angular-flot',
                              files: [ 'app/plugins/flot/jquery.flot.js', 'app/plugins/flot/jquery.flot.time.js', 'app/plugins/flot/jquery.flot.tooltip.min.js', 'app/plugins/flot/jquery.flot.spline.js', 'app/plugins/flot/jquery.flot.resize.js', 'app/plugins/flot/jquery.flot.pie.js', 'app/plugins/flot/curvedLines.js', 'app/plugins/flot/angular-flot.js', ]
                          },
                          {
                              name: 'angles',
                              files: ['app/plugins/chartJs/angles.js', 'app/plugins/chartJs/Chart.min.js']
                          },
                          {
                              name: 'angular-peity',
                              files: ['app/plugins/peity/jquery.peity.min.js', 'app/plugins/peity/angular-peity.js']
                          }
                      ])
        }}}) 
        .state('dashboard-detail', {
            parent: 'entity',
            url: '/dashboard/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.dashboard.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dashboard/dashboard-detail.html',
                    controller: 'DashboardDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dashboard');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Dashboard', function($stateParams, Dashboard) {
                    return Dashboard.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'dashboard',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('dashboard-detail.edit', {
            parent: 'dashboard-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dashboard/dashboard-dialog.html',
                    controller: 'DashboardDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Dashboard', function(Dashboard) {
                            return Dashboard.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dashboard.new', {
            parent: 'dashboard',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dashboard/dashboard-dialog.html',
                    controller: 'DashboardDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('dashboard', null, { reload: 'dashboard' });
                }, function() {
                    $state.go('dashboard');
                });
            }]
        })
        .state('dashboard.edit', {
            parent: 'dashboard',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dashboard/dashboard-dialog.html',
                    controller: 'DashboardDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Dashboard', function(Dashboard) {
                            return Dashboard.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dashboard', null, { reload: 'dashboard' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dashboard.delete', {
            parent: 'dashboard',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dashboard/dashboard-delete-dialog.html',
                    controller: 'DashboardDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Dashboard', function(Dashboard) {
                            return Dashboard.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('dashboard', null, { reload: 'dashboard' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
