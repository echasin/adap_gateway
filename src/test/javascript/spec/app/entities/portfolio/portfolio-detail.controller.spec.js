'use strict';

describe('Controller Tests', function() {

    describe('Portfolio Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPortfolio, MockPortfolioprojectmbr, MockCategory, MockSubcategory, MockRecordtype;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPortfolio = jasmine.createSpy('MockPortfolio');
            MockPortfolioprojectmbr = jasmine.createSpy('MockPortfolioprojectmbr');
            MockCategory = jasmine.createSpy('MockCategory');
            MockSubcategory = jasmine.createSpy('MockSubcategory');
            MockRecordtype = jasmine.createSpy('MockRecordtype');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Portfolio': MockPortfolio,
                'Portfolioprojectmbr': MockPortfolioprojectmbr,
                'Category': MockCategory,
                'Subcategory': MockSubcategory,
                'Recordtype': MockRecordtype
            };
            createController = function() {
                $injector.get('$controller')("PortfolioDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:portfolioUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
