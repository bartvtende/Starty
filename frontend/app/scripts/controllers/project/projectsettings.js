'use strict';

/**
 * @ngdoc function
 * @name startyApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the startyApp
 */
angular.module('startyApp')
    .controller('ProjectSettingsCtrl', function ($scope, $auth, $mdDialog, ProjectData, $state) {

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider);
        };

        $scope.confirmDelete = function (event, project) {
            console.log(project);
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .parent(angular.element(document.body))
                .title('Would you like to delete this project?')
                .content('The project you are about to delete is "' + project.name + '".')
                .ok('Ok')
                .cancel('Cancel')
                .targetEvent(event);
            $mdDialog.show(confirm).then(function () {
                ProjectData.deleteProject(project.shortcode)
                    .success(function () {
                        $state.go('overview.overview');
                    });
            });
        };

    });
