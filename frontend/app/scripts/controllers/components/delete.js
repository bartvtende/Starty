'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('DeleteCtrl', function ($scope, $mdDialog, $state, $mdToast, ProjectData) {

    $scope.confirmDeletion = function(oldProjectName, newProjectName) {
      if (oldProjectName == newProjectName) {
        ProjectData.deleteProject(oldProjectName)
          .success(function() {
            $scope.cancel();
            $mdToast.show(
              $mdToast.simple()
                .content('The project has now been deleted!')
                .position('bottom left')
                .hideDelay(3000)
            );
            $state.go('overview.overview');
          })
          .error(function() {
            $scope.cancel();
          });
      } else {
        $scope.cancel();
      }
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
