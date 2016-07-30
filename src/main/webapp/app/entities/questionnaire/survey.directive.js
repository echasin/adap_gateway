(function() {
    'use strict';

    angular
        .module('adapGatewayApp')
        .directive('choice', function(Questiongroup,Question,Subquestion) {
        	return {
          template: '<form name="myForm">'+
                    '<table class="jh-table table table-striped">'+
                    '<tr>'+
                    '<td><label class="radio-inline"><input type="radio" ng-model="choice" ng-change="vm.getChoiceAnswer(questiongroup.id,question.id,1)" value="1">1</label></td>'+
                    '<td><label class="radio-inline"><input type="radio" ng-model="choice" ng-change="vm.getChoiceAnswer(questiongroup.id,question.id,2)" value="2">2</label></td>'+
                    '<td><label class="radio-inline"><input type="radio" ng-model="choice" ng-change="vm.getChoiceAnswer(questiongroup.id,question.id,3)" value="3">3</label></td>'+
                    '<td><label class="radio-inline"><input type="radio" ng-model="choice" ng-change="vm.getChoiceAnswer(questiongroup.id,question.id,4)" value="4">4</label></td>'+
                    '<td><label class="radio-inline"><input type="radio" ng-model="choice" ng-change="vm.getChoiceAnswer(questiongroup.id,question.id,5)" value="5">5</label></td>'+
                    '</tr>'+
                    '</table>'
         };
        }).directive('array', function(Questiongroup,Question,Subquestion) {
        	return {
                template:    '<table class="jh-table table table-striped">'+
                             '<tr><th></th><th ng-repeat="answer in question.answer">{{answer.answeroption}}</th></tr>'+
                             '<tr ng-repeat="subquestion in question.subquestion"><td>{{subquestion.subquestion}}</td>'+
                             '<td ng-repeat="answer in question.answer"><input type="radio" value="{{answer.code}}" ng-change="vm.getGridAnswer(questiongroup.id,question.id,subquestion.id,answer.code)" ng-model="$parent.selectedanswer"></td></tr>'+
                             '</table>{{selectedanswer}}'
            };
        });

})();
