'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('LoginCtrl', function ($scope, $state) {

    $scope.login = function(user) {
      console.log(user);

      $state.go('overview.overview');

      return false;
    };

  });
