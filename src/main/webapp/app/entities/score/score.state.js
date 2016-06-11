(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('score', {
            parent: 'entity',
            url: '/score?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.score.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/score/scores.html',
                    controller: 'ScoreController',
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
                    $translatePartialLoader.addPart('score');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('score-detail', {
            parent: 'entity',
            url: '/score/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.score.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/score/score-detail.html',
                    controller: 'ScoreDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('score');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Score', function($stateParams, Score) {
                    return Score.get({id : $stateParams.id});
                }]
            }
        })
        .state('score.new', {
            parent: 'score',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/score/score-dialog.html',
                    controller: 'ScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                recordtype: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                value: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('score', null, { reload: true });
                }, function() {
                    $state.go('score');
                });
            }]
        })
        .state('score.edit', {
            parent: 'score',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/score/score-dialog.html',
                    controller: 'ScoreDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Score', function(Score) {
                            return Score.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('score', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('score.delete', {
            parent: 'score',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/score/score-delete-dialog.html',
                    controller: 'ScoreDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Score', function(Score) {
                            return Score.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('score', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
