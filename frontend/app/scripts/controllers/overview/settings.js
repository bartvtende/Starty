'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:GithubCtrl
 * @description
 * # GithubCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('SettingsCtrl', function ($scope, $auth) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

  });
