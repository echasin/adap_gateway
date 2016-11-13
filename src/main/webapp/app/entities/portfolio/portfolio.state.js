(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('portfolio', {
            parent: 'entity',
            url: '/portfolio',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolio.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolios.html',
                    controller: 'PortfolioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('portfolio');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
         .state('portfolio-home', {
            parent: 'entity',
            url: '/portfolio-home',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolio.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolio-home.html',
                    controller: 'PortfolioController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('portfolio');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('portfolio-detail', {
            parent: 'entity',
            url: '/portfolio/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolio.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolio-detail.html',
                    controller: 'PortfolioDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('portfolio');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Portfolio', function($stateParams, Portfolio) {
                    return Portfolio.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'portfolio',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
         .state('portfolio-edit', {
            parent: 'entity',
            url: '/portfolio/edit/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.portfolio.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/portfolio/portfolio-edit.html',
                    controller: 'PortfolioEditController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('portfolio');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Portfolio', function($stateParams, Portfolio) {
                    return Portfolio.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'portfolio',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('portfolio-detail.edit', {
            parent: 'portfolio-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-dialog.html',
                    controller: 'PortfolioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolio.new', {
            parent: 'portfolio-home',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-dialog.html',
                    controller: 'PortfolioDialogController',
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
                    $state.go('portfolio-home', null, { reload: 'portfolio-home' });
                }, function() {
                    $state.go('portfolio-home');
                });
            }]
        })
        .state('portfolio.edit', {
            parent: 'portfolio',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                	templateUrl: 'app/entities/portfolio/portfolio-edit.html',
                    controller: 'PortfolioDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolio', null, { reload: 'portfolio' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('portfolio.delete', {
            parent: 'portfolio',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/portfolio/portfolio-delete-dialog.html',
                    controller: 'PortfolioDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Portfolio', function(Portfolio) {
                            return Portfolio.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('portfolio', null, { reload: 'portfolio' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
