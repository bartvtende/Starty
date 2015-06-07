'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('SearchCtrl', function ($scope, $mdDialog) {
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
