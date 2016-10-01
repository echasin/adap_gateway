'use strict';

describe('Controller Tests', function() {

    describe('Responsedetail Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockResponsedetail;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockResponsedetail = jasmine.createSpy('MockResponsedetail');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Responsedetail': MockResponsedetail
            };
            createController = function() {
                $injector.get('$controller')("ResponsedetailDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'adapGatewayApp:responsedetailUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
