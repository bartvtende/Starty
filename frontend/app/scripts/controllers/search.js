'use strict';

/**
 * @ngdoc function
 * @name mockupsApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the mockupsApp
 */
angular.module('mockupsApp')
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
