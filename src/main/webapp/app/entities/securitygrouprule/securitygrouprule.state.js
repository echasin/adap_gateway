(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('securitygrouprule', {
            parent: 'entity',
            url: '/securitygrouprule?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.securitygrouprule.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprules.html',
                    controller: 'SecuritygroupruleController',
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
                    $translatePartialLoader.addPart('securitygrouprule');
                    $translatePartialLoader.addPart('ruledirectiontype');
                    $translatePartialLoader.addPart('ruletype');
                    $translatePartialLoader.addPart('protocol');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('securitygrouprule-detail', {
            parent: 'entity',
            url: '/securitygrouprule/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.securitygrouprule.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprule-detail.html',
                    controller: 'SecuritygroupruleDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('securitygrouprule');
                    $translatePartialLoader.addPart('ruledirectiontype');
                    $translatePartialLoader.addPart('ruletype');
                    $translatePartialLoader.addPart('protocol');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Securitygrouprule', function($stateParams, Securitygrouprule) {
                    return Securitygrouprule.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'securitygrouprule',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('securitygrouprule-detail.edit', {
            parent: 'securitygrouprule-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprule-dialog.html',
                    controller: 'SecuritygroupruleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Securitygrouprule', function(Securitygrouprule) {
                            return Securitygrouprule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('securitygrouprule.new', {
            parent: 'securitygrouprule',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprule-dialog.html',
                    controller: 'SecuritygroupruleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                ruledirectiontype: null,
                                ruletype: null,
                                protocol: null,
                                iprange: null,
                                fromport: null,
                                toport: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('securitygrouprule', null, { reload: 'securitygrouprule' });
                }, function() {
                    $state.go('securitygrouprule');
                });
            }]
        })
        .state('securitygrouprule.edit', {
            parent: 'securitygrouprule',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprule-dialog.html',
                    controller: 'SecuritygroupruleDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Securitygrouprule', function(Securitygrouprule) {
                            return Securitygrouprule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('securitygrouprule', null, { reload: 'securitygrouprule' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('securitygrouprule.delete', {
            parent: 'securitygrouprule',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/securitygrouprule/securitygrouprule-delete-dialog.html',
                    controller: 'SecuritygroupruleDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Securitygrouprule', function(Securitygrouprule) {
                            return Securitygrouprule.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('securitygrouprule', null, { reload: 'securitygrouprule' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
