'use strict';

describe('Controller Tests', function() {

    describe('Category Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockCategory, MockRecordtype, MockSubcategory, MockAsset, MockOrganization, MockOrganizationorganizationmbr, MockKey;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockCategory = jasmine.createSpy('MockCategory');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockAsset = jasmine.createSpy('MockAsset');
            MockOrganization = jasmine.createSpy('MockOrganization');
            MockOrganizationorganizationmbr = jasmine.createSpy('MockOrganizationorganizationmbr');
            MockKey = jasmine.createSpy('MockKey');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Category': MockCategory,
                'Recordtype': MockRecordtype,
                'Subcategory': MockSubcategory,
                'Asset': MockAsset,
                'Organization': MockOrganization,
                'Organizationorganizationmbr': MockOrganizationorganizationmbr,
                'Key': MockKey
            };
            createController = function() {
                $injector.get('$controller')("CategoryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:categoryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
