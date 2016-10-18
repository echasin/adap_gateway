(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('responsedetail', {
            parent: 'entity',
            url: '/responsedetail?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.responsedetail.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/responsedetail/responsedetails.html',
                    controller: 'ResponsedetailController',
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
                    $translatePartialLoader.addPart('responsedetail');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('responsedetail-detail', {
            parent: 'entity',
            url: '/responsedetail/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.responsedetail.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/responsedetail/responsedetail-detail.html',
                    controller: 'ResponsedetailDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('responsedetail');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Responsedetail', function($stateParams, Responsedetail) {
                    return Responsedetail.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('responsedetail.new', {
            parent: 'responsedetail',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/responsedetail/responsedetail-dialog.html',
                    controller: 'ResponsedetailDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                responseId: null,
                                questionnaireId: null,
                                questiongroupId: null,
                                questionId: null,
                                subquestionId: null,
                                response: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('responsedetail', null, { reload: true });
                }, function() {
                    $state.go('responsedetail');
                });
            }]
        })
        .state('responsedetail.edit', {
            parent: 'responsedetail',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/responsedetail/responsedetail-dialog.html',
                    controller: 'ResponsedetailDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Responsedetail', function(Responsedetail) {
                            return Responsedetail.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('responsedetail', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('responsedetail.delete', {
            parent: 'responsedetail',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/responsedetail/responsedetail-delete-dialog.html',
                    controller: 'ResponsedetailDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Responsedetail', function(Responsedetail) {
                            return Responsedetail.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('responsedetail', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
