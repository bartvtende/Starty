'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('ProjectCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
