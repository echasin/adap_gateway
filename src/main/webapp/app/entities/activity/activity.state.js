(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('activity', {
            parent: 'entity',
            url: '/activity?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.activity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/activity/activities-inbox.html',
                    controller: 'ActivityController',
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
                    $translatePartialLoader.addPart('activity');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('activity-inbox', {
            parent: 'entity',
            url: '/activity-inbox',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.activity.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/activity/activities-inbox.html',
                    controller: 'ActivityInboxController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('activity-detail', {
            parent: 'entity',
            url: '/activity/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'adapGatewayApp.activity.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/activity/activity-detail.html',
                    controller: 'ActivityDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('activity');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Activity', function($stateParams, Activity) {
                    return Activity.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'activity',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('activity-detail.edit', {
            parent: 'activity-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-dialog.html',
                    controller: 'ActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Activity', function(Activity) {
                            return Activity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('activity.new', {
            parent: 'activity',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-dialog.html',
                    controller: 'ActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                nameshort: null,
                                description: null,
                                activitydatetime: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('activity', null, { reload: 'activity' });
                }, function() {
                    $state.go('activity');
                });
            }]
        })
        .state('activity.edit', {
            parent: 'activity',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-dialog.html',
                    controller: 'ActivityDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Activity', function(Activity) {
                            return Activity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('activity', null, { reload: 'activity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('activity.delete', {
            parent: 'activity',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-delete-dialog.html',
                    controller: 'ActivityDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Activity', function(Activity) {
                            return Activity.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('activity', null, { reload: 'activity' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('key-dates', {
        	parent: "activity-inbox",
        	url: '/key-dates/{id}',
            views: {
                'activity': {
                    templateUrl: 'app/entities/activity/key-dates.html',
                    controller: 'ActivityInboxController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('requests', {
        	parent: "activity-inbox",
        	url: '/requests/{id}',
            views: {
                'activity': {
                    templateUrl: 'app/entities/activity/requests.html',
                    controller: 'ActivityInboxController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('concurrences', {
            parent: "activity-inbox",
        	url: '/concurrences/{id}',
            views: {
                'activity': {
                    templateUrl: 'app/entities/activity/concurrences.html',
                    controller: 'ActivityInboxController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('tasks', {
            parent: "activity-inbox",
        	url: '/tasks/{id}',
            views: {
                'activity': {
                    templateUrl: 'app/entities/activity/tasks.html',
                    controller: 'ActivityInboxController',
                    controllerAs: 'vm'
                }
            }
        })
           .state('newactivityproject', {
           // parent: 'program-edit',
            url: '/newactivityproject/{id}',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal , $location) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-dialog.html',
                    controller: 'ActivityEditController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                nameshort: null,
                                description: null,
                                activitydatetime: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $location.path('project-edit/'+$stateParams.id);
                }, function() {
                	$location.path('project-edit/'+$stateParams.id);
                });
            }]
        })
         .state('newactivityprogram', {
           // parent: 'program-edit',
            url: '/newactivityprogram/{id}',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal','$location', function($stateParams, $state, $uibModal , $location) {
                $uibModal.open({
                    templateUrl: 'app/entities/activity/activity-dialog.html',
                    controller: 'ActivityEditController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                nameshort: null,
                                description: null,
                                activitydatetime: null,
                                status: null,
                                lastmodifiedby: null,
                                lastmodifieddatetime: null,
                                domain: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $location.path('program-edit/'+$stateParams.id);
                }, function() {
                	$location.path('program-edit/'+$stateParams.id);
                });
            }]
        });
    }

})();