'use strict';

describe('Controller Tests', function() {

    describe('Activitymbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockActivitymbr, MockActivity, MockProject, MockAsset;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockActivitymbr = jasmine.createSpy('MockActivitymbr');
            MockActivity = jasmine.createSpy('MockActivity');
            MockProject = jasmine.createSpy('MockProject');
            MockAsset = jasmine.createSpy('MockAsset');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Activitymbr': MockActivitymbr,
                'Activity': MockActivity,
                'Project': MockProject,
                'Asset': MockAsset
            };
            createController = function() {
                $injector.get('$controller')("ActivitymbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:activitymbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
