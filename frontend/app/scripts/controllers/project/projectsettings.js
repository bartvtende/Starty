'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('ProjectSettingsCtrl', function ($scope, $auth, $mdDialog) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    $scope.deleteProject = function() {
      $mdDialog.show({
        controller: 'DeleteCtrl',
        templateUrl: 'views/components/delete.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    }

  });
