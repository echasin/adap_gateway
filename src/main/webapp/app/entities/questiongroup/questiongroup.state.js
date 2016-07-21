(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('questiongroup', {
            parent: 'entity',
            url: '/questiongroup?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.questiongroup.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questiongroup/questiongroups.html',
                    controller: 'QuestiongroupController',
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
                    $translatePartialLoader.addPart('questiongroup');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('questiongroup-detail', {
            parent: 'entity',
            url: '/questiongroup/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.questiongroup.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questiongroup/questiongroup-detail.html',
                    controller: 'QuestiongroupDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('questiongroup');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Questiongroup', function($stateParams, Questiongroup) {
                    return Questiongroup.get({id : $stateParams.id});
                }]
            }
        })
        .state('questiongroup.new', {
            parent: 'questiongroup',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questiongroup/questiongroup-dialog.html',
                    controller: 'QuestiongroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                description: null,
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
                    $state.go('questiongroup', null, { reload: true });
                }, function() {
                    $state.go('questiongroup');
                });
            }]
        })
        .state('questiongroup.edit', {
            parent: 'questiongroup',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questiongroup/questiongroup-dialog.html',
                    controller: 'QuestiongroupDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Questiongroup', function(Questiongroup) {
                            return Questiongroup.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('questiongroup', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('questiongroup.delete', {
            parent: 'questiongroup',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questiongroup/questiongroup-delete-dialog.html',
                    controller: 'QuestiongroupDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Questiongroup', function(Questiongroup) {
                            return Questiongroup.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('questiongroup', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
