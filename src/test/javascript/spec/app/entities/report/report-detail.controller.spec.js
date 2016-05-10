'use strict';

describe('Controller Tests', function() {

    describe('Report Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockReport, MockReportparameter;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockReport = jasmine.createSpy('MockReport');
            MockReportparameter = jasmine.createSpy('MockReportparameter');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Report': MockReport,
                'Reportparameter': MockReportparameter
            };
            createController = function() {
                $injector.get('$controller')("ReportDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:reportUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
