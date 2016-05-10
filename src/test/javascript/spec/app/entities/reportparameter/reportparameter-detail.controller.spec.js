'use strict';

describe('Controller Tests', function() {

    describe('Reportparameter Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockReportparameter, MockReport;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockReportparameter = jasmine.createSpy('MockReportparameter');
            MockReport = jasmine.createSpy('MockReport');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Reportparameter': MockReportparameter,
                'Report': MockReport
            };
            createController = function() {
                $injector.get('$controller')("ReportparameterDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:reportparameterUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
