'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('LoginCtrl', function ($scope) {

    $scope.login = function(user) {
      console.log(user);

      return false;
    };

  });
