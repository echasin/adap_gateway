(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('subquestion', {
            parent: 'entity',
            url: '/subquestion?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.subquestion.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/subquestion/subquestions.html',
                    controller: 'SubquestionController',
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
                    $translatePartialLoader.addPart('subquestion');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('subquestion-detail', {
            parent: 'entity',
            url: '/subquestion/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.subquestion.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/subquestion/subquestion-detail.html',
                    controller: 'SubquestionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('subquestion');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Subquestion', function($stateParams, Subquestion) {
                    return Subquestion.get({id : $stateParams.id});
                }]
            }
        })
        .state('subquestion.new', {
            parent: 'subquestion',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subquestion/subquestion-dialog.html',
                    controller: 'SubquestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                subquestion: null,
                                code: null,
                                position: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('subquestion', null, { reload: true });
                }, function() {
                    $state.go('subquestion');
                });
            }]
        })
        .state('subquestion.edit', {
            parent: 'subquestion',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subquestion/subquestion-dialog.html',
                    controller: 'SubquestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Subquestion', function(Subquestion) {
                            return Subquestion.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('subquestion', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('subquestion.delete', {
            parent: 'subquestion',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subquestion/subquestion-delete-dialog.html',
                    controller: 'SubquestionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Subquestion', function(Subquestion) {
                            return Subquestion.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('subquestion', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
