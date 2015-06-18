'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:NavbarctrlCtrl
 * @description
 * # NavbarctrlCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
  .controller('NavbarCtrl', function ($scope, $mdSidenav, $mdToast, $mdDialog, $state, $stateParams, OrganizationData, ProjectData, UserData) {

    $scope.projectName = '';
    $scope.organizationName = '';
    $scope.project = null;
    $scope.organization = null;
    $scope.user = null;

    $scope.$watch('$viewContentLoaded', function() {

      UserData.getUser()
        .success(function(user) {
          if (user.result.organization_id == 0 || user.result.organization_id == null)
            $state.go('auth.join-organization');
          $scope.user = user.result;
        })
        .error(function() {
          $mdToast.show(
            $mdToast.simple()
              .content('Something went wrong while fetching your user data!')
              .position('bottom left')
              .hideDelay(3000)
          );
        });

      if ($stateParams.projectName != null) {
        ProjectData.getProject($stateParams.projectName)
            .success(function(project) {
              $scope.projectName = project.result.name;
              $scope.project = project.result;
              $scope.organization = null;
            })
            .error(function() {
              $mdToast.show(
                  $mdToast.simple()
                      .content('Something went wrong while fetching the project info!')
                      .position('bottom left')
                      .hideDelay(3000)
              );
            });
      } else {
        OrganizationData.getOrganization()
          .success(function (organization) {
            $scope.organizationName = organization.result.name;
            $scope.organization = organization.result;
            $scope.project = null;
          })
          .error(function () {
              $mdToast.show(
                  $mdToast.simple()
                      .content('Something went wrong while fetching the organization info!')
                      .position('bottom left')
                      .hideDelay(3000)
              );
            });
      }
    });

    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.navigateTo = function(to) {
      $state.go(to);
    };

    $scope.spawnProfilePopup = function(event) {
      $mdDialog.show({
        controller: 'ProfileCtrl',
        templateUrl: 'views/components/profile.html',
        targetEvent: event
      })
      .then(function(answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.alert = 'You cancelled the dialog.';
      });
    };
  });
