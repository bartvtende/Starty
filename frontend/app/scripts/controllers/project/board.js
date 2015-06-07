'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('BoardCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
