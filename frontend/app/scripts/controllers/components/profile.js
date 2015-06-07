'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ProfileCtrl', function ($scope, $mdDialog, $state) {
        $scope.navigateTo = function(to) {
            $mdDialog.hide();
            $state.go(to);
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    });
