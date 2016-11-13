'use strict';

describe('Controller Tests', function() {

    describe('Recordtype Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockRecordtype, MockCategory, MockAsset, MockOrganization, MockProject, MockPortfolio, MockRequest;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockCategory = jasmine.createSpy('MockCategory');
            MockAsset = jasmine.createSpy('MockAsset');
            MockOrganization = jasmine.createSpy('MockOrganization');
            MockProject = jasmine.createSpy('MockProject');
            MockPortfolio = jasmine.createSpy('MockPortfolio');
            MockRequest = jasmine.createSpy('MockRequest');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Recordtype': MockRecordtype,
                'Category': MockCategory,
                'Asset': MockAsset,
                'Organization': MockOrganization,
                'Project': MockProject,
                'Portfolio': MockPortfolio,
                'Request': MockRequest
            };
            createController = function() {
                $injector.get('$controller')("RecordtypeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:recordtypeUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
