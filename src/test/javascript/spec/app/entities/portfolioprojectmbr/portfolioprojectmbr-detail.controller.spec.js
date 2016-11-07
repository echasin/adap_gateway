'use strict';

describe('Controller Tests', function() {

    describe('Portfolioprojectmbr Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPortfolioprojectmbr, MockPortfolio, MockProject;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPortfolioprojectmbr = jasmine.createSpy('MockPortfolioprojectmbr');
            MockPortfolio = jasmine.createSpy('MockPortfolio');
            MockProject = jasmine.createSpy('MockProject');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Portfolioprojectmbr': MockPortfolioprojectmbr,
                'Portfolio': MockPortfolio,
                'Project': MockProject
            };
            createController = function() {
                $injector.get('$controller')("PortfolioprojectmbrDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:portfolioprojectmbrUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
