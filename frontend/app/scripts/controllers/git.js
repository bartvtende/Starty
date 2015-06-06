'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:GitCtrl
 * @description
 * # GitCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('GitCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
