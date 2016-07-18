(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('questionnaire', {
            parent: 'entity',
            url: '/questionnaire?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.questionnaire.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questionnaire/questionnaires.html',
                    controller: 'QuestionnaireController',
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
                    $translatePartialLoader.addPart('questionnaire');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('questionnaire-detail', {
            parent: 'entity',
            url: '/questionnaire/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.questionnaire.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/questionnaire/questionnaire-detail.html',
                    controller: 'QuestionnaireDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('questionnaire');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Questionnaire', function($stateParams, Questionnaire) {
                    return Questionnaire.get({id : $stateParams.id});
                }]
            }
        })
        .state('questionnaire.new', {
            parent: 'questionnaire',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-dialog.html',
                    controller: 'QuestionnaireDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                title: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('questionnaire');
                });
            }]
        })
        .state('questionnaire.edit', {
            parent: 'questionnaire',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-dialog.html',
                    controller: 'QuestionnaireDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Questionnaire', function(Questionnaire) {
                            return Questionnaire.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('questionnaire.delete', {
            parent: 'questionnaire',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/questionnaire/questionnaire-delete-dialog.html',
                    controller: 'QuestionnaireDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Questionnaire', function(Questionnaire) {
                            return Questionnaire.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('questionnaire', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
