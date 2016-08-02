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
        }).directive('multiblechoice', function(Questiongroup,Question,Subquestion) {
        	return {
                template:    '<table class="jh-table table table-striped">'+
                             '<tr ng-repeat="subquestion in question.subquestion">'+
                             '<td><input type="checkbox" ng-change="vm.getmultiselect(questiongroup.id,question.id,subquestion.id)" ng-model="$parent.selectedanswer">{{subquestion.subquestion}}</td>'+
                             '<td><input type="text" ng-change="vm.getmultiselecttext(questiongroup.id,question.id,subquestion.id)" ng-model="vm.text"></td></tr>'+
                             '</table>'
            };
        }).directive('text', function(Questiongroup,Question,Subquestion) {
        	return {
                template:    '<textarea ng-model="vm.largeText" ng-change="vm.getLargeText()" cols="50" rows="6"></textarea>'
            };
        });

})();
